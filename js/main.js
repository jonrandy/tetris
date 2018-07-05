
import { Board, Piece } from './anytris.js';
import { Tetrominos } from'./tetris.js';


let myBoard = Board();
let myPiece = Piece({
	x: 3,
	y: myBoard.playHeight+3,
	tile: Tetrominos[6]
});

console.log(myBoard.pieceFits(myPiece));
console.log(myBoard.allBlocks());

myBoard.activePieces.push(myPiece);


let b = window.document.getElementById('board');

draw(myBoard);

window.setInterval(() => {
	myPiece.moveRel(0,-1);
	if (!myBoard.pieceFits(myPiece)) myPiece.undo();
	draw(myBoard);
}, 500);


function draw(board) {
	let blocks = board.allBlocks();
	b.value = blocks.reverse().map( (row,i) => row.map( (col) => col?'x':'.' ).join('')).join('');
}
