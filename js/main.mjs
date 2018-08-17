
import { Board, Piece } from './anytris.mjs';
import { Tetrominos } from './tetris.mjs';
import { GameController, KeyboardDriver as Keyboard } from './gamecontroller.mjs';

import { Ticker } from './ticker.mjs';


const REPEAT = {
	pauseThenSlow:	{ initialRepeatDelay: 10, repeatEvery: 5 },
	none:						{ repeatEvery: 0 },
	continous:			{  },
};

const CONTROL_REPEAT_CFG = {
	left:			REPEAT.pauseThenSlow,
	right:		REPEAT.pauseThenSlow,
	up:				REPEAT.none,
	down:			REPEAT.continous,
	buttonA:	REPEAT.none
};

const CONTROLLER = GameController(Keyboard);

let
	gameAction,
	gameActionTicker,
	gameId
;

const GAMELOOP = () => {

	if (CONTROLLER.info.buttonsOn) {
		if (gameAction !== CONTROLLER.info.lastOn) {
			gameAction = CONTROLLER.info.lastOn;
			gameActionTicker = Ticker(CONTROL_REPEAT_CFG[gameAction]);
		}
	} else {
		gameAction = gameActionTicker = false;
	}

	gameAction && gameActionTicker.on() && console.log(gameAction + ' : ' + Math.random())

};

gameId = window.setInterval(GAMELOOP, 50);




// window.ticker = Ticker({
// 	onValue: 'Yeah',
// 	offValue: 'No',
// 	repeatEvery: 1,
// 	initialRepeatDelay: 10
// });


// let myBoard = Board();
// let createPiece = ()=>Piece({
// 	x: Math.random()*10|0, //8|0,
// 	y: myBoard.playHeight+3,
// 	tile: Tetrominos[7] // Tetrominos[Math.random()*6|0]
// }).rotate(1); //Math.random()*4|0);
// let myPiece = createPiece();



// let b = window.document.getElementById('board');
// let k = window.document.getElementById('keys');

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
