
import { Board, Piece } from './anytris.mjs';
import { Tetrominos } from'./tetris.mjs';


let myBoard = Board();
let createPiece = ()=>Piece({
	x: Math.random()*10|0, //8|0,
	y: myBoard.playHeight+3,
	tile: Tetrominos[7] // Tetrominos[Math.random()*6|0]
}).rotate(1); //Math.random()*4|0);
let myPiece = createPiece();



let b = window.document.getElementById('board');


let interval = window.setInterval(() => {
	myPiece.moveRel(0,-1);
	if (!myBoard.pieceFits(myPiece)) {
		myPiece.undo();
		myBoard.freeze([myPiece]);
		let winners = myBoard.winningBlocks();
		if (winners.length) {
			myBoard.killBlocks(winners);
		}
		myPiece = createPiece();
	}
	draw(myBoard);
}, 5);


function draw(board) {
	let blocks = board.allBlocks({ activePieces: [myPiece], cropAtPlayHeight:true });
	b.value = blocks.reverse().map( (row,i) => '     '+row.map( (col) => col?'X':'.' ).join('')).join("\n");
}
