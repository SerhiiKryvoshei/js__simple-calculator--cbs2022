const screenLast = document.querySelector(".calculator__screen-last");
const screenCurrent = document.querySelector(".calculator__screen-current");

const buttons = document.querySelectorAll(".calculator__ellipse");
const numberButtons = document.querySelectorAll(".number");

let userInput = [];
let screen = null;

function setHandlers() {
	numberButtons.forEach((btn) => {
		btn.addEventListener("click", numbersHandler);
	});
}

function numbersHandler() {
	let num = this.outerText;

	if (userInput.length > 8) return;

	userInput.push(num);
	updateScreen();
}

function updateScreen() {
	screen = userInput.join("");
	screenCurrent.textContent = screen;
}

setHandlers();
