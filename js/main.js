const screenLast = document.querySelector(".calculator__screen-last");
const screenCurrent = document.querySelector(".calculator__screen-current");
let currentFontSize = screenCurrent.style.fontSize;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

let userInput = [];
let screen = null;
let stack = null;
let stackOperation = null;
let inputOperation = null;
let currentOperation = null;

let shouldClearScreenCurrent = false;

initializationCalculator();
setHandlers();

//#region initialization ----------------------------------------------------------

function initializationCalculator() {
	userInput = [];
	screen = null;
	stack = null;
	stackOperation = null;
	inputOperation = null;
	screenLast.textContent = "";
	screenCurrent.textContent = "0";
	currentOperation = null;
}

function setHandlers() {
	document.addEventListener("keydown", keyboardInputHandler);

	numberButtons.forEach(btn => btn.addEventListener("click", numbersHandler));
	operatorButtons.forEach(btn =>
		btn.addEventListener("click", operatorsHandler)
	);
	equalsBtn.addEventListener("click", equalsHandler);
}

//#endregion

//#region Event Handlers ----------------------------------------------------------

function keyboardInputHandler(e) {
	if (e.key >= 0 && e.key <= 9) {
		if (shouldClearScreenCurrent) clearScreenCurrent();
		userInput.push(e.key);
		updateScreen();
	} else if (e.key === "Escape") {
		initializationCalculator();
	} else if (e.key === "Backspace" || e.key === "Delete") {
		deleteNumber();
	} else if (e.key === "=" || e.key === "Enter") {
		equalsHandler();
	} else if (
		e.key === "+" ||
		e.key === "-" ||
		e.key === "*" ||
		e.key === "/" ||
		e.key === "%"
	) {
		inputOperation = e.key;
		currentOperation = inputOperation;
		stack = screen;
		screenLast.textContent = `${screenCurrent.textContent} ${inputOperation}`;
		shouldClearScreenCurrent = true;
	}
}

function numbersHandler(e) {
	let num = this.outerText;
	screenCurrent.style.fontSize = currentFontSize;

	if (userInput.length > 8) return;

	if (num == "+/-") {
		if (userInput[0] == "-") {
			userInput.shift();
		} else userInput.unshift("-");
		updateScreen();
		return;
	}

	if (shouldClearScreenCurrent) clearScreenCurrent();
	userInput.push(num);
	updateScreen();
}

function operatorsHandler(e) {
	inputOperation = e.target.outerText;

	if (screen == null) return;
	if (inputOperation == "AC") {
		initializationCalculator();
		return;
	}
	if (inputOperation == "X") currentOperation = "*";
	else if (inputOperation == "÷") currentOperation = "/";
	else currentOperation = inputOperation;

	stack = screen;
	screenLast.textContent = `${screenCurrent.textContent} ${inputOperation}`;
	shouldClearScreenCurrent = true;
}

function equalsHandler(e) {
	if (stack == null) return;
	let result = doMath(stack, screen, currentOperation);
	initializationCalculator();
	updateScreen(result);
}

//#endregion

//#region Service Functions -------------------------------------------------------

function updateScreen(result) {
	if (arguments.length > 0 && !Number.isFinite(result)) {
		initializationCalculator();
		screenCurrent.style.fontSize = "18px";
		screenCurrent.textContent = result;
		return;
	} else if (arguments.length > 0) {
		screen = result;
	} else screen = userInput.join("");

	screenCurrent.textContent = screen;
}

function deleteNumber() {
	userInput.pop();
	updateScreen();
}

function clearScreenCurrent() {
	screenCurrent.textContent = "";
	userInput = [];
	shouldClearScreenCurrent = false;
}

function doMath(a, b, operator) {
	a = parseFloat(a);
	b = parseFloat(b);

	switch (operator) {
		case "+":
			return a + b;
		case "-":
			return a - b;
		case "*":
			return a * b;
		case "%":
			return a % b;
		case "/":
			if (b == 0) return `division by zero is not possible`;
			return a / b;
	}
}

//#endregion
