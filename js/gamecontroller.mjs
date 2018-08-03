export function GameController(driverFactory) {

	let
		_self,
		driver = driverFactory();
	;

	driver.start(setButtonState, window.document);

	function setButtonState(button, state) {
		_self[button] = state;
		_self.info[state?'lastOn':'lastOff'] = button;
		_self.info['buttonsOn'] = Object.values(_self).includes(true);
	}

	function shutdown() {
		driver.stop();
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
		buttonQuit: false,
		info: {
			lastOn: '',
			lastOff: '',
			buttonsOn: false
		},
		shutdown
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
	buttonQuit					= 27	// Escape					
} = {}) {

	let
		_self,
		buttonKeyCodes = { up, down, left, right, buttonA, buttonB, buttonSelect, buttonStart, buttonQuit },
		keyCodeMap = Object.keys(buttonKeyCodes).reduce((map, key) => {
			map[buttonKeyCodes[key]] = key;
			return map;
		}, {}),
		eventEmitter,
		sendSignal
	;

	console.log(keyCodeMap);

	function start(func, emitter) {
		sendSignal = func;
		eventEmitter = emitter;
		eventEmitter.addEventListener('keydown', handleKeyDown);
		eventEmitter.addEventListener('keyup', handleKeyUp);
	}

	function stop() {
		eventEmitter.removeEventListener('keydown', handleKeyDown);
		eventEmitter.removeEventListener('keyup', handleKeyUp);
	}

	function handleKeyDown(e) {
		signalKey(e.keyCode, true);
	}

	function handleKeyUp(e) {
		signalKey(e.keyCode, false);
	}

	function signalKey(keyCode, state) {
		keyCodeMap[keyCode] && sendSignal(keyCodeMap[keyCode], state);
	}


	return _self = {
		start
	};

}