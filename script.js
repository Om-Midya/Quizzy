const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Spain", correct: false },
      { text: "Delhi", correct: false },
      { text: "Texas", correct: false },
    ],
  },
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Delhi", correct: true },
      { text: "Paris", correct: false },
      { text: "Spain", correct: false },
      { text: "Texas", correct: false },
    ],
  },
  {
    question: "What is the capital of Spain?",
    answers: [
      { text: "Madrid", correct: true },
      { text: "Paris", correct: false },
      { text: "Delhi", correct: false },
      { text: "Texas", correct: false },
    ],
  },
  {
    question: "What is the capital of Germany?",
    answers: [
      { text: "Berlin", correct: true },
      { text: "Paris", correct: false },
      { text: "Delhi", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the capital of Italy?",
    answers: [
      { text: "Rome", correct: true },
      { text: "Berlin", correct: false },
      { text: "Delhi", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Tokyo", correct: true },
      { text: "Berlin", correct: false },
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
];

const quiz = document.querySelector(".quiz");
const question = document.querySelector("#question");
const answers = document.querySelector("#answer-button");
const nextButton = document.querySelector(".next-btn");

const welcomeScreen = document.querySelector(".welcome-screen");
const startButton = document.querySelector(".start-btn");
const quizContainer = document.getElementById("quiz-container");

welcomeScreen.style.display = "block";

startButton.addEventListener("click", startQuiz);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  welcomeScreen.style.display = "none"; // Hide welcome screen
  quizContainer.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  clearAnswers();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answers.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

let totalQuestions = questions.length;
let attemptedQuestions = 0;

function updateProgressBar() {
  attemptedQuestions++;
  let progress = (attemptedQuestions / totalQuestions) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  document.getElementById("attempted-questions").textContent =
    "Questions attempted: " + attemptedQuestions + "/" + questions.length;
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answers.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";

  // Update the progress bar
  updateProgressBar();
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    clearAnswers();
    question.innerHTML = "Your score is " + score + "/" + questions.length;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    score = 0;
  }
}

function clearAnswers() {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    document.getElementById("progress-bar").style.width = "0%";
    attemptedQuestions = 0;
    startQuiz();
  }
});
