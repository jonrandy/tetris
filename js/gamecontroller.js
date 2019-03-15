import Ticker from './ticker.js';

const	
	UP = 						Symbol('UP'),
	DOWN = 					Symbol('DOWN'),
	LEFT = 					Symbol('LEFT'),
	RIGHT = 				Symbol('RIGHT'),
	BUTTON_A = 			Symbol('BUTTON_A'),
	BUTTON_B = 			Symbol('BUTTON_B'),
	BUTTON_SELECT =	Symbol('BUTTON_SELECT'),
	BUTTON_START = 	Symbol('BUTTON_START'),
	BUTTON_QUIT = 	Symbol('BUTTON_QUIT')
;


export const GC = {
	UP,
	DOWN,
	LEFT,
	RIGHT,
	BUTTON_A,
	BUTTON_B,
	BUTTON_SELECT,
	BUTTON_START,
	BUTTON_QUIT
};


export function GameController(driver) {

	let
		_self
	;

	start();

	function setButtonState(button, state) {
		_self[button] = state;
		_self.info[state?'lastOn':'lastOff'] = button;
		_self.info['buttonsOn'] = Object.values(_self).includes(true);
	}

	function start() {
		driver.start(setButtonState, window.document);
	}

	function stop() {
		driver.stop();
	}

	return _self = {
		[UP]: false,
		[DOWN]: false,
		[LEFT]: false,
		[RIGHT]: false,
		[BUTTON_A]: false,
		[BUTTON_B]: false,
		[BUTTON_SELECT]: false,
		[BUTTON_START]: false,
		[BUTTON_QUIT]: false,
		info: {
			lastOn: '',
			lastOff: '',
			buttonsOn: false
		},
		start,
		stop
	};

}


export function SingleActionGameController(driver, repeatConfig) {

	let
		gameAction,
		gameActionTicker,
		gc = GameController(driver)
	;

	function getAction() {

		let newAction = gc[gc.info.lastOn] && gc.info.lastOn;

		if (!newAction) {
			gameAction = gameActionTicker = false;
		} else if (newAction !== gameAction) {
			gameAction = newAction;
			gameActionTicker = Ticker(repeatConfig[gameAction]);
		}

		return (gameActionTicker && gameActionTicker.on()) ? gameAction : false;
	}

	return Object.freeze({
		start: gc.start,
		stop: gc.stop,
		getAction
	})

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
	buttonQuit		= 27	// Escape					
} = {}) {

	let
		_self,
		keyCodeMap = {
			[up]: UP,
			[down]: DOWN,
			[left]: LEFT,
			[right]: RIGHT,
			[buttonA]: BUTTON_A,
			[buttonB]: BUTTON_B,
			[buttonSelect]: BUTTON_SELECT,
			[buttonStart]: BUTTON_START,
			[buttonQuit]: BUTTON_QUIT
		},
		eventEmitter,
		sendSignal
	;

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