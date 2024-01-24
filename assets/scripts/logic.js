import questions from "./questions.js";

let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

//note constants
const timerEl = document.getElementById("time");
const questionsEl = document.getElementById("questions");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");
const initialsEl = document.getElementById("initials");
const feedbackEl = document.getElementById("feedback");

const correctSound = new Audio("./assets/sfx/happyCrowdTrim.mp3");
const wrongSound = new Audio("./assets/sfx/wrongSound.mp3");
const gameOverSound = new Audio("./assets/sfx/gameOver2.mp3");

function startQuiz() {
	document.getElementById("start-screen").classList.add("hide");
	questionsEl.classList.remove("hide");
	timerId = setInterval(clockTick, 1000);
	timerEl.textContent = time;
	getQuestion();
}

function getQuestion() {
	const currentQuestion = questions[currentQuestionIndex];
	const titleEl = document.getElementById("question-title");
	titleEl.textContent = currentQuestion.question;
	choicesEl.innerHTML = "";

	for (let i = 1; i <= 4; i++) {
		const choice = currentQuestion["choice" + i];
		const choiceButton = document.createElement("button");
		choiceButton.setAttribute("class", "choice");
		choiceButton.setAttribute("data-number", i);
		choiceButton.textContent = choice;
		choiceButton.onclick = questionClick;
		choicesEl.appendChild(choiceButton);
	}
}
function questionClick() {
	const selectedAnswer = parseInt(this.getAttribute("data-number"));
	const correctAnswer = questions[currentQuestionIndex].answer;

	feedbackEl.classList.remove("correct", "incorrect");

	if (selectedAnswer !== correctAnswer) {
		time -= 15;
		if (time <= 0) {
			time = 0;
			timerEl.textContent = time;
			wrongSound.play();
			quizEnd();
			return;
		} else {
			wrongSound.play();
		}

		feedbackEl.textContent = "Wrong!";
		feedbackEl.classList.add("incorrect");
		timerEl.textContent = time;
	} else {
		correctSound.play();
		feedbackEl.textContent = "Correct!";
		feedbackEl.classList.add("correct");
	}

	feedbackEl.classList.remove("hide");
	setTimeout(() => {
		feedbackEl.classList.add("hide");
		moveToNextQuestion();
	}, 1000);
}

function moveToNextQuestion() {
	currentQuestionIndex++;
	if (currentQuestionIndex === questions.length) {
		quizEnd();
	} else {
		getQuestion();
	}
}

function quizEnd() {
	clearInterval(timerId);
	gameOverSound.play();
	const endScreenEl = document.getElementById("end-screen");
	endScreenEl.classList.remove("hide");
	const finalScoreEl = document.getElementById("final-score");
	finalScoreEl.textContent = time;
	questionsEl.classList.add("hide");
}

function clockTick() {
	time--;
	timerEl.textContent = time;

	if (time <= 0) {
		time = 0;
		timerEl.textContent = time;
		quizEnd();
	}
}

function saveHighscore() {
	const initials = initialsEl.value.trim();
	if (initials !== "") {
		const highscores =
			JSON.parse(window.localStorage.getItem("highscores")) || [];
		const newScore = {
			score: time,
			initials: initials,
		};
		//note  Save to local storage
		highscores.push(newScore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));
	}

	// note Go to highscores page
	window.location.href = "highscores.html";
}

startBtn.onclick = startQuiz;
submitBtn.onclick = saveHighscore;
