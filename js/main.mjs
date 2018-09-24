
import { Config as CFG, PlayStates as PS } from './config.mjs';
import { Board, PieceQueue } from './anytris.mjs';
import Tetrominos from './tetrominos.mjs';
import TetrisHTMLView from './tetrisHTML.mjs';
import { GC, SingleActionGameController, KeyboardDriver } from './gamecontroller.mjs';
import Ticker from './ticker.mjs';

window.queue = PieceQueue({ length: 5, tileSet: Tetrominos, initialPos: [3,23] });


const
	GAME_CONTROLLER = SingleActionGameController( KeyboardDriver(), CFG.CONTROL_REPEAT),
	VISUALISER = TetrisHTMLView({ document })
;



let GAME = ((controller, gameVisualiser)=>{

	let

		_action,
		_score,
		_state = PS.PASSIVE,
		_board = Board(),
		_piece,
		_nextPieces,

		_handlers = {

			// Game not active - waiting for user to initiate game
			[PS.PASSIVE] () {
				_action && console.log(_action, ':PASSIVE:', Math.random());
				if (_action==GC.BUTTON_A) _start();
			},

			// Game is active
			[PS.ACTIVE] () {
				_action && console.log(_action, ':INGAME:', Math.random());
			},

			// Game is active, but paused
			[PS.PAUSED] () {

			}

		},

		_start = ()=>{
			_reset();
			_state = PS.ACTIVE;
			_score = 0;
		},

		_reset = ()=>{
			_board.clear();
		}



	;

	function step() {
		_action = controller.getAction();
		_handlers[_state]();
	}

	function draw() {
		gameVisualiser.update();
	}


	return {
		step,
		draw
	};

})(GAME_CONTROLLER, VISUALISER);

const GAMELOOP = () => {
	GAME.step();
	GAME.draw();
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
