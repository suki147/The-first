import cv2
import mediapipe as mp
import numpy as np

class FingerTrackingVideoOverlay:
    """
    使用手部识别追踪指尖，在原视频上覆盖另一段视频
    Tracks fingertip position and overlays another video on the original video
    """
    
    def __init__(self, main_video_path, overlay_video_path, output_path="output.mp4"):
        """
        初始化参数
        
        Args:
            main_video_path: 主视频路径（包含手部的视频）
            overlay_video_path: 覆盖视频路径（要叠加的视频）
            output_path: 输出视频路径
        """
        print(f"[DEBUG] 初始化开始...")
        print(f"[DEBUG] main_video_path: {main_video_path}")
        print(f"[DEBUG] overlay_video_path: {overlay_video_path}")
        
        self.main_video_path = main_video_path
        self.overlay_video_path = overlay_video_path
        self.output_path = output_path
        
        # 初始化MediaPipe手部检测器
        print(f"[DEBUG] 初始化 MediaPipe...")
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        print(f"[DEBUG] MediaPipe 初始化完成")
        self.mp_drawing = mp.solutions.drawing_utils
        
        # 加载视频
        print(f"[DEBUG] 加载主视频: {main_video_path}")
        self.main_cap = cv2.VideoCapture(main_video_path)
        print(f"[DEBUG] 主视频打开状态: {self.main_cap.isOpened()}")
        
        print(f"[DEBUG] 加载覆盖视频: {overlay_video_path}")
        self.overlay_cap = cv2.VideoCapture(overlay_video_path)
        print(f"[DEBUG] 覆盖视频打开状态: {self.overlay_cap.isOpened()}")
        
        # 获取视频属性
        print(f"[DEBUG] 获取视频属性...")
        self.fps = int(self.main_cap.get(cv2.CAP_PROP_FPS))
        self.width = int(self.main_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.height = int(self.main_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self.total_frames = int(self.main_cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        print(f"[DEBUG] FPS: {self.fps}")
        print(f"[DEBUG] 分辨率: {self.width}x{self.height}")
        print(f"[DEBUG] 总帧数: {self.total_frames}")
        
        # 获取覆盖视频属性
        self.overlay_width = int(self.overlay_cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.overlay_height = int(self.overlay_cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        
        # 初始化视频写入器
        print(f"[DEBUG] 初始化视频写入器...")
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        self.out = cv2.VideoWriter(output_path, fourcc, self.fps, 
                                   (self.width, self.height))
        print(f"[DEBUG] 视频写入器初始化完成")
        print(f"[DEBUG] 初始化完全完成！")
    
    def get_fingertip_position(self, landmarks, frame_width, frame_height):
        """
        获取指尖位置（食指）
        Get the position of the fingertip (index finger)
        
        Returns:
            tuple: (x, y) 坐标，如果检测不到则返回 None
        """
        if landmarks is None:
            return None
        
        fingertip = landmarks.landmark[8]
        
        x = int(fingertip.x * frame_width)
        y = int(fingertip.y * frame_height)
        
        return (x, y)
    
    def overlay_video_at_position(self, main_frame, overlay_frame, position, 
                                   overlay_size=100):
        """
        在指定位置覆盖视频帧
        """
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
        
        overlay_crop = overlay_resized[overlay_crop_y1:overlay_crop_y2, 
                                       overlay_crop_x1:overlay_crop_x2]
        
        if overlay_crop.shape[0] > 0 and overlay_crop.shape[1] > 0:
            main_frame[y1:y1+overlay_crop.shape[0], x1:x1+overlay_crop.shape[1]] = overlay_crop
        
        return main_frame
    
    def process(self):
        """
        处理视频并生成输出
        """
        print(f"开始处理视频... (总帧数: {self.total_frames})")
        print("Starting video processing... (Total frames: {})".format(self.total_frames))
        
        frame_count = 0
        
        while True:
            ret_main, main_frame = self.main_cap.read()
            ret_overlay, overlay_frame = self.overlay_cap.read()
            
            if not ret_main:
                break
            
            if not ret_overlay:
                self.overlay_cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                ret_overlay, overlay_frame = self.overlay_cap.read()
            
            rgb_frame = cv2.cvtColor(main_frame, cv2.COLOR_BGR2RGB)
            
            results = self.hands.process(rgb_frame)
            
            if results.multi_hand_landmarks:
                for hand_landmarks in results.multi_hand_landmarks:
                    fingertip_pos = self.get_fingertip_position(
                        hand_landmarks, self.width, self.height
                    )
                    
                    main_frame = self.overlay_video_at_position(
                        main_frame, overlay_frame, fingertip_pos, overlay_size=80
                    )
            
            self.out.write(main_frame)
            
            frame_count += 1
            if frame_count % 30 == 0:
                progress = (frame_count / self.total_frames) * 100
                print(f"处理进度: {progress:.1f}% ({frame_count}/{self.total_frames})")
        
        print("视频处理完成! (Video processing completed!)")
        print(f"输出文件: {self.output_path}")
        
        self.cleanup()
    
    def cleanup(self):
        """释放所有资源"""
        self.main_cap.release()
        self.overlay_cap.release()
        self.out.release()
        self.hands.close()
        cv2.destroyAllWindows()


def main():
    """主函数 - 使用示例"""
    
    main_video = "main_video.mp4"
    overlay_video = "overlay_video.mp4"
    output_video = "output.mp4"
    
    print("=" * 50)
    print("开始初始化...")
    print("=" * 50)
    
    try:
        print(f"正在加载主视频: {main_video}")
        processor = FingerTrackingVideoOverlay(main_video, overlay_video, output_video)
        print(f"✓ 主视频加载完成")
        
        print("\n开始处理视频...")
        processor.process()
        print("✓ 处理完成！")
        
    except Exception as e:
        print(f"❌ 错误: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
