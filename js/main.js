
import { Board, Piece } from './anytris.js';
import { Tetrominos } from'./tetris.js';


let myBoard = Board();
let myPiece = Piece({
	x: 3,
	y: myBoard.playHeight + 3,
	tile: Tetrominos[0]
});

console.log(myBoard.pieceFits(myPiece));
console.log(myBoard.allBlocks());

myBoard.activePieces.push(myPiece);

console.log(myBoard);

console.log(myBoard.allBlocks());



