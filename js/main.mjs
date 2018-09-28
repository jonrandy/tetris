
import CFG from './config.mjs';
import { Board, PieceQueue, PlayStates as PS } from './anytris.mjs';
import Tetrominos from './tetrominos.mjs';
import TetrisHTMLView from './tetrisHTML.mjs';
import { GC, SingleActionGameController, KeyboardDriver } from './gamecontroller.mjs';
import Ticker from './ticker.mjs';


const
	GAME_CONTROLLER = SingleActionGameController( KeyboardDriver(CFG.KEYBOARD_CONTROLS), CFG.CONTROL_REPEAT),
	VISUALISER = TetrisHTMLView({ document, debugMode: true })
;



let GAME = ((controller, gameVisualiser)=>{

	let

		action,
		score,
		state = PS.PASSIVE,
		board = Board(),
		piece,
		level,
		nextPieces,
		_dropTicker,

		_handlers = {

			// Game not active - waiting for user to initiate game
			[PS.PASSIVE] () {
				if (action==GC.BUTTON_A) _start();
			},

			// Game is active
			[PS.ACTIVE] () {
				if (action==GC.BUTTON_SELECT) _togglePause(true);
				if (action==GC.BUTTON_QUIT) _quit();
			},

			// Game is active, but paused
			[PS.PAUSED] () {
				if (action==GC.BUTTON_SELECT) _togglePause(false);
				if (action==GC.BUTTON_QUIT) _quit();
			}

		},

		_start = ()=>{
			_reset();
			state = PS.ACTIVE;
		},

		_togglePause = (paused)=>{
			state = paused ? PS.PAUSED : PS.ACTIVE;
		},

		_quit = ()=>{
			state = PS.PASSIVE;
		},

		_reset = ()=>{
			board.clear();
			score = 0;
			piece = undefined;
			nextPieces = PieceQueue({ tileSet: Tetrominos, initialPos: CFG.PIECE_STARTPOS });
			level = 1;
			_dropTicker = _makeDropTicker(level);
		},

		_makeDropTicker= (level)=>{
			const
				loops = 22 - level*2,
				t = Ticker({ repeatEvery: loops })
			;
			t.value(); // move past initial tick
			return t;
		}





	;

	function step() {
		action = controller.getAction();
		_handlers[state]();
	}

	function draw() {
		gameVisualiser.update({
			score,
			state,
			board,
			piece,
			nextPieces,
			level,
			action
		});
	}


	return {
		step,
		draw
	};

})(GAME_CONTROLLER, VISUALISER);

const GAMELOOP = () => {
	GAME.draw();
	GAME.step();
};

const gameId = window.setInterval(GAMELOOP, 50);



// let myBoard = Board();
// let createPiece = ()=>Piece({
// 	x: Math.random()*10|0, //8|0,
// 	y: myBoard.playHeight+3,
// 	tile: Tetrominos[7] // Tetrominos[Math.random()*6|0]
// }).rotate(1); //Math.random()*4|0);
// let myPiece = createPiece();



// let b = window.document.getElementById('board');
// let k = window.document.getElementById('keys');

// let Keyboard = KeyboardDriver();

// let controller = GameController(Keyboard);


// let interval = window.setInterval(() => {
// 	myPiece.moveRel(0,-1);
// 	if (!myBoard.pieceFits(myPiece)) {
// 		myPiece.undo();
// 		myBoard.freeze([myPiece]);
// 		let winners = myBoard.winningBlocks();
// 		if (winners.length) {
// 			myBoard.killBlocks(winners);
// 		}
// 		myPiece = createPiece();
// 	}
// 	draw(myBoard);

// 	let s = "Up : " + controller.up + "\n";
// 	s += "Down : " + controller.down + "\n";
// 	s += "Left : " + controller.left + "\n";
// 	s += "Right : " + controller.right + "\n";
// 	s += "Button A : " + controller.buttonA + "\n";
// 	s += "Button B : " + controller.buttonB + "\n";
// 	s += "Select : " + controller.buttonSelect + "\n";
// 	s += "Start : " + controller.buttonStart + "\n";
// 	s += "Quit : " + controller.buttonQuit + "\n";
// 	s += "Last On : " + controller.info.lastOn + "\n";
// 	s += "Last Off : " + controller.info.lastOff + "\n";
// 	s += "Buttons on : " + controller.info.buttonsOn + "\n";

// 	k.value = s;

// }, 5);


// function draw(board) {
// 	let blocks = board.allBlocks({ activePieces: [myPiece], cropAtPlayHeight:true });
// 	b.value = blocks.reverse().map( (row,i) => '     '+row.map( (col) => col?'X':'.' ).join('')).join("\n");
// }
