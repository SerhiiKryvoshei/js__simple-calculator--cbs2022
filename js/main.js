const output1 = document.querySelector(".calculator__output1");
const output2 = document.querySelector(".calculator__output2");

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
	output2.textContent = screen;
}

setHandlers();
