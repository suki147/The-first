const words = [
  ['meticulous', '极其细致的；一丝不苟的', 'me + tick（刻度）：对每个刻度都较真。', 'The scientist is meticulous in recording every detail.', '', [['miscellaneous', '杂乱的'], ['miraculous', '奇迹般的']]],
  ['enhance', '增强；提高', 'en + hance：让能力“往上”加。', 'Regular practice can enhance your vocabulary.', '', [['enchant', '使着迷'], ['entrance', '入口；使入迷']]],
  ['abundant', '丰富的；大量的', 'a bunch（很多一束）联想 abundant。', 'The region is abundant in natural resources.', '', [['abandon', '放弃'], ['absorbent', '吸水的']]],
  ['comply', '遵守；服从', 'com + ply：和规则“贴合”在一起。', 'All employees must comply with the regulations.', '', [['compile', '汇编'], ['complex', '复杂的']]],
  ['dilemma', '困境；进退两难', 'di（两）+ lemma（命题）：两个选择的难题。', 'She faced a difficult dilemma.', '', [['diploma', '文凭'], ['dilettante', '一知半解的人']]],
  ['resilient', '有弹性的；适应力强的', 're（再）+ sil（跳）：摔倒后还能弹回来。', 'Young people are resilient in the face of change.', '', [['reliant', '依赖的'], ['resistant', '抵抗的']]],
  ['address', '地址；处理、解决（熟词生义）', 'address a problem = 把问题“摆到桌面上”处理。', 'The report addresses the causes of inequality.', '熟词生义｜常考：处理、解决', [['addict', '使上瘾的人'], ['adverse', '不利的']]],
  ['capital', '首都；资本；大写字母（熟词生义）', 'capital city 是首都，capital investment 是资本投入。', 'Human capital is essential to innovation.', '熟词生义｜常考：资本', [['capitol', '国会大厦'], ['capable', '有能力的']]],
  ['concern', '担心；涉及、对……重要（熟词生义）', 'concern = con（共同）+ cern（关心）：大家都关心。', 'The issue concerns every student.', '熟词生义｜常考：涉及', [['concert', '音乐会'], ['confirm', '确认']]],
  ['critical', '批判性的；关键的；危急的（熟词生义）', 'critic 会挑问题，critical 也可表示关键、危急。', 'Critical thinking is a critical skill.', '熟词生义｜常考：关键的', [['crucial', '关键的'], ['clinical', '临床的']]],
  ['decline', '下降；婉拒；衰退（熟词生义）', 'de（向下）+ cline（倾斜）：向下倾斜就是下降，也可婉拒。', 'The company declined to comment.', '熟词生义｜常考：婉拒', [['define', '定义'], ['incline', '倾向；斜坡']]],
  ['discipline', '纪律；训练；学科（熟词生义）', 'discipline 让人守规则，也指长期训练。', 'Self-discipline is the key to learning.', '熟词生义｜常考：自律、训练', [['disciple', '门徒'], ['displace', '取代']]],
  ['draft', '草稿；起草；征召（熟词生义）', 'draft 是“初步画出的版本”，也可指起草文件。', 'She drafted a proposal for the project.', '熟词生义｜常考：起草', [['drift', '漂流'], ['craft', '工艺；精心制作']]],
  ['expose', '暴露；使接触（熟词生义）', 'ex（向外）+ pose（放）：把东西放到外面。', 'Reading exposes students to new ideas.', '熟词生义｜常考：使接触', [['compose', '组成；创作'], ['explore', '探索']]],
  ['generous', '慷慨的；宽宏大量的', 'generate（产生）+ ous：能产生很多分享给别人。', 'He made a generous donation.', '', [['genuine', '真诚的'], ['general', '普遍的']]],
  ['issue', '问题；发行；发布（熟词生义）', 'issue 是“推出到外面”，所以可指发行、发布。', 'The magazine is issued monthly.', '熟词生义｜常考：发行、发布', [['tissue', '组织；纸巾'], ['insist', '坚持']]],
  ['maintain', '维持；主张；维修（熟词生义）', 'main（主要）+ tain（拿住）：把状态拿住。', 'The study maintains that sleep is essential.', '熟词生义｜常考：主张', [['contain', '包含'], ['sustain', '维持；支撑']]],
  ['observe', '观察；遵守；庆祝（熟词生义）', 'ob（向着）+ serve（看/服务）：看见并照做。', 'Students must observe the safety rules.', '熟词生义｜常考：遵守', [['deserve', '值得'], ['preserve', '保护']]],
  ['overlook', '俯瞰；忽略（熟词生义）', 'look over：从上往下看，既可俯瞰也可能漏看而忽略。', 'Do not overlook the importance of sleep.', '熟词生义｜常考：忽略', [['overcome', '克服'], ['outlook', '前景；观点']]],
  ['perform', '表演；执行；表现（熟词生义）', 'per（完全）+ form（形成）：把任务完整做出来。', 'The new engine performs well.', '熟词生义｜常考：表现、执行', [['platform', '平台'], ['transform', '转变']]],
  ['promote', '促进；晋升；推广（熟词生义）', 'pro（向前）+ mote（推动）：向前推动。', 'The campaign promotes healthy habits.', '熟词生义｜常考：促进、推广', [['propose', '提议'], ['remote', '遥远的']]],
  ['remarkable', '非凡的；值得注意的', 'remark 是评论：值得评论的就是非凡的。', 'She made remarkable progress.', '', [['reliable', '可靠的'], ['reasonable', '合理的']]],
  ['reserve', '储备；预订；保留（熟词生义）', 're（再次）+ serve（服务）：先留着以后用。', 'Please reserve a seat in advance.', '熟词生义｜常考：预订、保留', [['reverse', '颠倒；相反'], ['preserve', '保护']]],
  ['significant', '重要的；显著的；有意义的', 'sign（标记）+ ificant：留下明显标记的。', 'There was a significant increase in sales.', '', [['insignificant', '不重要的'], ['signal', '信号']]],
  ['subject', '主题；科目；使服从（熟词生义）', 'subject 可作“被置于某事之下”，所以是使服从。', 'The policy subjects workers to unfair conditions.', '熟词生义｜常考：使遭受、使服从', [['object', '物体；反对'], ['submit', '提交；服从']]],
  ['sustain', '维持；支撑；遭受（熟词生义）', 'sus（在下）+ tain（拿）：从下面托住。', 'The building sustained serious damage.', '熟词生义｜常考：遭受', [['contain', '包含'], ['attain', '达到']]],
  ['tackle', '处理；拦截；用具（熟词生义）', 'tackle a problem：像擒抱一样抓住问题处理。', 'We need to tackle climate change.', '熟词生义｜常考：处理', [['tactful', '圆滑的'], ['tickle', '挠痒']]],
  ['temper', '脾气；调和；使缓和（熟词生义）', 'temper 是给情绪“调温”，让它不太热。', 'The remark tempered his enthusiasm.', '熟词生义｜常考：缓和', [['temporary', '暂时的'], ['temperature', '温度']]],
  ['undertake', '承担；着手做', 'under + take：把任务“接到手下”承担。', 'The team undertook a major research project.', '', [['intake', '摄入量'], ['outtake', '删节片段']]],
  ['valid', '有效的；合理的；有根据的', 'valid 和 value 同源：有价值、站得住脚。', 'That is a valid argument.', '', [['vivid', '生动的'], ['vital', '至关重要的']]],
  ['yield', '产出；屈服；让步（熟词生义）', '农田 yield 产出，遇到压力 yield 就让步。', 'The research yielded useful results.', '熟词生义｜常考：产出、让步', [['field', '领域；田地'], ['yell', '叫喊']]],
  ['yielding', '柔软的；易屈服的；产出的', 'yield + ing：正在让步或持续产出。', 'The material is soft and yielding.', '熟词生义｜常考：易屈服的', [['yawning', '打哈欠的'], ['yearning', '渴望的']]]
].map(([word, meaning, memory, example, sense, similar]) => ({ word, meaning, memory, example, sense, similar }));

const quizData = [
  {
    question: 'The passage mainly suggests that sustainable development requires a balance between economic growth and environmental protection.',
    options: ['A. Economic growth is more important than environmental concerns.', 'B. Environmental protection should be postponed until the economy is strong.', 'C. Long-term development must consider both economic and ecological factors.', 'D. Governments should ignore public opinion in policy-making.'],
    answer: 2
  },
  {
    question: 'Which statement best reflects the author’s attitude toward online learning?',
    options: ['A. It is entirely inferior to classroom learning.', 'B. It has great potential but still needs improvement in interaction and discipline.', 'C. It will replace traditional education soon.', 'D. It is suitable only for language courses.'],
    answer: 1
  },
  {
    question: 'The phrase “at a crossroads” in the passage most likely means:',
    options: ['A. approaching a dangerous location', 'B. facing a critical decision or turning point', 'C. walking in the middle of a road', 'D. already making a final decision'],
    answer: 1
  }
];

const wordText = document.getElementById('wordText');
const wordMeaning = document.getElementById('wordMeaning');
const wordMemory = document.getElementById('wordMemory');
const wordExample = document.getElementById('wordExample');
const wordSense = document.getElementById('wordSense');
const wordProgress = document.getElementById('wordProgress');
const wordExamTag = document.getElementById('wordExamTag');
const similarWords = document.getElementById('similarWords');
const masterWordBtn = document.getElementById('masterWord');
const nextWordBtn = document.getElementById('nextWord');
const timerDisplay = document.getElementById('timer');
const timerToggle = document.getElementById('timerToggle');
const timerReset = document.getElementById('timerReset');
const focusBtn = document.getElementById('focusBtn');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');

let currentWordIndex = 0;
let timerSeconds = 25 * 60;
let timerInterval = null;
let isTimerRunning = false;
let quizIndex = 0;
let questionLocked = false;

function renderWord() {
  const word = words[currentWordIndex];
  wordText.textContent = word.word;
  wordMeaning.textContent = word.meaning;
  wordMemory.innerHTML = `<strong>记忆法：</strong>${word.memory}`;
  wordExample.textContent = word.example;
  wordSense.textContent = word.sense;
  wordSense.hidden = !word.sense;
  wordExamTag.textContent = word.sense ? '熟词生义 · 高频' : '六级高频';
  wordProgress.textContent = `${String(currentWordIndex + 1).padStart(2, '0')} / ${words.length}`;
  similarWords.innerHTML = word.similar
    .map(([similarWord, meaning]) => `<span class="similar-word">${similarWord} <em>· ${meaning}</em></span>`)
    .join('');
  masterWordBtn.textContent = '标记已掌握';
  masterWordBtn.classList.remove('mastered');
}

function nextWord() {
  currentWordIndex = (currentWordIndex + 1) % words.length;
  renderWord();
}

masterWordBtn.addEventListener('click', () => {
  masterWordBtn.classList.toggle('mastered');
  masterWordBtn.textContent = masterWordBtn.classList.contains('mastered') ? '已掌握 ✓' : '标记已掌握';
});

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  timerToggle.textContent = '暂停';
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds -= 1;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerToggle.textContent = '开始';
      alert('专注时间结束！别忘了复盘一下今天的学习内容。');
    }
  }, 1000);
}

function pauseTimer() {
  if (!isTimerRunning) return;
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerToggle.textContent = '继续';
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerSeconds = 25 * 60;
  updateTimerDisplay();
  timerToggle.textContent = '开始';
}

function renderQuiz() {
  const currentQuestion = quizData[quizIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = '';
  questionLocked = false;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(index, button));
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(selectedIndex, button) {
  if (questionLocked) return;
  const currentQuestion = quizData[quizIndex];
  questionLocked = true;
  const buttons = document.querySelectorAll('.option-btn');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === currentQuestion.answer) {
      btn.classList.add('correct');
    }
    if (idx === selectedIndex && idx !== currentQuestion.answer) {
      btn.classList.add('wrong');
    }
  });

  if (selectedIndex === currentQuestion.answer) {
    button.classList.add('correct');
  }

  setTimeout(() => {
    quizIndex = (quizIndex + 1) % quizData.length;
    renderQuiz();
  }, 1000);
}

nextWordBtn.addEventListener('click', nextWord);

focusBtn.addEventListener('click', () => {
  if (isTimerRunning) {
    pauseTimer();
    focusBtn.textContent = '开始 25 分钟专注';
  } else {
    startTimer();
    focusBtn.textContent = '暂停专注';
  }
});

timerToggle.addEventListener('click', () => {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

timerReset.addEventListener('click', () => {
  resetTimer();
  focusBtn.textContent = '开始 25 分钟专注';
});

document.querySelectorAll('.task-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const task = button.closest('.task');
    if (!task) return;
    const done = task.classList.toggle('done');
    button.classList.toggle('done-btn', done);
    button.textContent = done ? '已完成' : '待完成';
  });
});

renderWord();
updateTimerDisplay();
renderQuiz();
