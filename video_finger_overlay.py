import cv2
import mediapipe as mp

class FingerTrackingVideoOverlay:
    def __init__(self, main_video_path, overlay_video_path, output_path="output.avi"):
        print(f"正在初始化...")
        self.main_video_path = main_video_path
        self.overlay_video_path = overlay_video_path
        self.output_path = output_path
        
        # 初始化 MediaPipe
        print(f"初始化 MediaPipe...")
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        # 打开视频
        print(f"打开主视频: {main_video_path}")
        self.main_cap = cv2.VideoCapture(main_video_path)
        
        print(f"打开覆盖视频: {overlay_video_path}")
        self.overlay_cap = cv2.VideoCapture(overlay_video_path)
        
        # 获取主视频信息
        self.fps = int(self.main_cap.get(cv2.CAP_PROP_FPS))
        self.width = int(self.main_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.height = int(self.main_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self.total_frames = int(self.main_cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        print(f"✓ 主视频信息:")
        print(f"  - 分辨率: {self.width}x{self.height}")
        print(f"  - FPS: {self.fps}")
        print(f"  - 总帧数: {self.total_frames}")
        
        # 初始化视频写入器 (使用 XVID 编码)
        print(f"初始化视频写入器...")
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        self.out = cv2.VideoWriter(output_path, fourcc, self.fps, (self.width, self.height))
        
        if not self.out.isOpened():
            print("✗ 视频写入器打开失败，尝试使用 MJPEG...")
            fourcc = cv2.VideoWriter_fourcc(*'MJPG')
            self.out = cv2.VideoWriter(output_path, fourcc, self.fps, (self.width, self.height))
        
        print(f"✓ 初始化完成！")
    
    def get_fingertip_position(self, landmarks, frame_width, frame_height):
        if landmarks is None:
            return None
        fingertip = landmarks.landmark[8]
        x = int(fingertip.x * frame_width)
        y = int(fingertip.y * frame_height)
        return (x, y)
    
    def overlay_video_at_position(self, main_frame, overlay_frame, position, overlay_size=100):
        if position is None:
            return main_frame
        
        x, y = position
        overlay_resized = cv2.resize(overlay_frame, (overlay_size, overlay_size))
        
        x1 = max(0, x - overlay_size // 2)
        y1 = max(0, y - overlay_size // 2)
        x2 = min(self.width, x1 + overlay_size)
        y2 = min(self.height, y1 + overlay_size)
        
        overlay_crop_x1 = 0
        overlay_crop_y1 = 0
        
        if x1 < 0:
            overlay_crop_x1 = -x1
            x1 = 0
        if y1 < 0:
            overlay_crop_y1 = -y1
            y1 = 0
        
        overlay_crop_x2 = overlay_crop_x1 + (x2 - x1)
        overlay_crop_y2 = overlay_crop_y1 + (y2 - y1)
        
        if overlay_crop_x2 > overlay_size:
            overlay_crop_x2 = overlay_size
        if overlay_crop_y2 > overlay_size:
            overlay_crop_y2 = overlay_size
        
        overlay_crop = overlay_resized[overlay_crop_y1:overlay_crop_y2, overlay_crop_x1:overlay_crop_x2]
        
        if overlay_crop.shape[0] > 0 and overlay_crop.shape[1] > 0:
            main_frame[y1:y1+overlay_crop.shape[0], x1:x1+overlay_crop.shape[1]] = overlay_crop
        
        return main_frame
    
    def process(self):
        print(f"\n开始处理视频...")
        print(f"总帧数: {self.total_frames}")
        print("=" * 50)
        
        frame_count = 0
        
        while True:
            ret_main, main_frame = self.main_cap.read()
            ret_overlay, overlay_frame = self.overlay_cap.read()
            
            if not ret_main:
                print("主视频已读完")
                break
            
            if not ret_overlay:
                self.overlay_cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                ret_overlay, overlay_frame = self.overlay_cap.read()
            
            rgb_frame = cv2.cvtColor(main_frame, cv2.COLOR_BGR2RGB)
            results = self.hands.process(rgb_frame)
            
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    fingertip_pos = self.get_fingertip_position(hand_landmarks, self.width, self.height)
                    main_frame = self.overlay_video_at_position(main_frame, overlay_frame, fingertip_pos, overlay_size=80)
            
            self.out.write(main_frame)
            frame_count += 1
            
            if frame_count % max(1, self.total_frames // 10) == 0:
                progress = (frame_count / self.total_frames) * 100
                print(f"处理进度: {progress:.1f}% ({frame_count}/{self.total_frames})")
        
        print("=" * 50)
        print("✓ 视频处理完成！")
        print(f"输出文件: {self.output_path}")
        self.cleanup()
    
    def cleanup(self):
        print("释放资源...")
        self.main_cap.release()
        self.overlay_cap.release()
        self.out.release()
        self.hands.close()
        cv2.destroyAllWindows()
        print("✓ 完成！")

def main():
    main_video = "main_video.mp4"
    overlay_video = "overlay_video.mp4"
    output_video = "output.avi"
    
    try:
        processor = FingerTrackingVideoOverlay(main_video, overlay_video, output_video)
        processor.process()
    except Exception as e:
        print(f"✗ 错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
