
import { Board, Piece } from './anytris.js';
import { Tetrominos } from'./tetris.js';


let myBoard = Board();
let createPiece = () =>Piece({
	x: Math.random()*8|0,
	y: myBoard.playHeight+3,
	tile: Tetrominos[Math.random()*6|0]
}).rotate(Math.random()*4|0);
let myPiece = createPiece();

console.log(myBoard.pieceFits(myPiece));
console.log(myBoard.allBlocks());

myBoard.activePieces.push(myPiece);


let b = window.document.getElementById('board');

draw(myBoard);

window.setInterval(() => {
	myPiece.moveRel(0,-1);
	if (!myBoard.pieceFits(myPiece)) {
		myPiece.undo();
		myBoard.freeze();
		myPiece = createPiece();
		myBoard.activePieces.push(myPiece);
	}
	draw(myBoard);
}, 50);


function draw(board) {
	let blocks = board.allBlocks();
	b.value = blocks.reverse().map( (row,i) => '     '+row.map( (col) => col?'X':'.' ).join('')).join("\n");
}
