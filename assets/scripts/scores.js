function displayHighscores() {
	const highscoresList = document.getElementById("highscores");
	const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

	highscoresList.innerHTML = highscores
		.map((score) => `<li>${score.initials} - ${score.score}</li>`)
		.join("");
}

function clearHighscores() {
	localStorage.removeItem("highscores");
	displayHighscores();
}

document.getElementById("clear").addEventListener("click", clearHighscores);

displayHighscores();
