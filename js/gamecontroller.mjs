export function GameController(driverFactory) {

	let
		_self,
		driver = driverFactory();
	;

	driver.start(buttonPressed, window.document);

	function buttonPressed(button, state) {
		_self[button] = state;
	}

	return _self = {
		up: false,
		down: false,
		left: false,
		right: false,
		buttonA: false,
		buttonB: false,
		buttonSelect: false,
		buttonStart: false,
		quit: false
	};

}



export function KeyboardDriver({
	up						= 38, // Up arrow
	down					= 40, // Down arrow
	left					= 37, // Left arrow
	right					= 39, // Right arrow
	buttonA				= 90, // Z
	buttonB				= 88, // X
	buttonSelect	= 9,	// Tab
	buttonStart		= 13,	// Return
	quit					= 27	// Escape					
} = {}) {

	let
		_self,
		buttonKeyCodes = { up, down, left, right, buttonA, buttonB, buttonSelect, buttonStart, quit }
	;

	// TODO - code to store a transposed keycodemap here
	// Object.keys(j).reduce((prev, key)=> {
	// 	prev[j[key]] = key;
	// 	return prev;
	// }, {});

	function start(pressedFunc, docObj) {
		docObj.addEventListener('keydown', handleKeyDown);
		docObj.addEventListener('keyup', handleKeyUp);
	}

	function handleKeyUp() {

	}

	function handleKeyDown() {
		
	}


	return _self = {
		start
	};

}