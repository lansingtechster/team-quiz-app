const quizConfig = window.quizConfig;
const questionsPerRun = quizConfig.QUESTIONS_PER_RUN;
const quizQuestions = quizConfig.animalQuestions;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const questionTextEl = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const resultScoreEl = document.getElementById("result-score");
const resultTextEl = document.getElementById("result-text");

const AUTO_ADVANCE_DELAY = 3;

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let autoAdvanceTimer = null;
let autoAdvanceCountdown = AUTO_ADVANCE_DELAY;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function validateQuestionData() {
  const valid = quizQuestions.every((item) => {
    return (
      typeof item.question === "string" &&
      Array.isArray(item.options) &&
      item.options.length === 4 &&
      item.options.includes(item.answer)
    );
  });

  return valid && quizQuestions.length >= questionsPerRun;
}

function clearAutoAdvance() {
  if (autoAdvanceTimer) {
    clearInterval(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  autoAdvanceCountdown = AUTO_ADVANCE_DELAY;
}

function resetNextButton() {
  clearAutoAdvance();
  nextBtn.hidden = true;
  nextBtn.textContent = "Next Question";
}

function startAutoAdvance() {
  clearAutoAdvance();
  autoAdvanceCountdown = AUTO_ADVANCE_DELAY;
  nextBtn.textContent = `Next Question (${AUTO_ADVANCE_DELAY})`;

  autoAdvanceTimer = setInterval(() => {
    autoAdvanceCountdown -= 1;

    if (autoAdvanceCountdown > 0) {
      nextBtn.textContent = `Next Question (${autoAdvanceCountdown})`;
      return;
    }

    clearAutoAdvance();
    nextBtn.click();
  }, 1000);
}

function startQuiz() {
  if (!validateQuestionData()) {
    startScreen.innerHTML =
      "<p>Quiz setup error. Please check question data.</p>";
    return;
  }

  clearAutoAdvance();
  selectedQuestions = shuffle(quizQuestions).slice(0, questionsPerRun);
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  startScreen.hidden = true;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  resetNextButton();

  renderQuestion();
}

function renderQuestion() {
  answered = false;
  resetNextButton();
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  const current = selectedQuestions[currentQuestionIndex];
  questionTextEl.textContent = current.question;
  progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questionsPerRun}`;
  scoreEl.textContent = `Score: ${score}`;
  answersEl.innerHTML = "";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.style.animationDelay = `${index * 60}ms`;
    button.addEventListener("click", () => selectAnswer(button, option));
    answersEl.appendChild(button);
  });
}

function selectAnswer(clickedButton, selectedOption) {
  if (answered) {
    return;
  }

  answered = true;
  const current = selectedQuestions[currentQuestionIndex];
  const isCorrect = selectedOption === current.answer;
  const allButtons = answersEl.querySelectorAll("button");

  allButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === current.answer) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    score += 1;
    clickedButton.classList.add("correct");
    feedbackEl.textContent = "Correct! Great job!";
    feedbackEl.classList.add("good");
    nextBtn.hidden = false;
    startAutoAdvance();
  } else {
    clickedButton.classList.add("wrong");
    feedbackEl.textContent = `Not quite. The correct answer is ${current.answer}.`;
    feedbackEl.classList.add("bad");
    nextBtn.hidden = false;
    nextBtn.textContent = "Next Question";
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.focus();
}

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  const percent = Math.round((score / questionsPerRun) * 100);
  resultScoreEl.textContent = `${score} / ${questionsPerRun}`;

  if (score === questionsPerRun) {
    resultTextEl.textContent = `Amazing! You got every question right (${percent}%).`;
  } else if (score >= 3) {
    resultTextEl.textContent = `Nice work! You scored ${percent}%.`;
  } else {
    resultTextEl.textContent = `Great try! You scored ${percent}%. Play again to beat your score.`;
  }
}

function nextQuestion() {
  clearAutoAdvance();
  currentQuestionIndex += 1;
  if (currentQuestionIndex >= questionsPerRun) {
    nextBtn.hidden = true;
    showResults();
    return;
  }
  renderQuestion();
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);