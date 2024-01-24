function displayHighscores() {
	const highscoresList = document.getElementById("highscores");
	const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

	highscores.sort((a, b) => b.score - a.score);

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
