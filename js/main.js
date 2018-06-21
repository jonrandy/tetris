
import { Board, Piece } from './anytris.js';
import { Tetrominos as Tiles } from'./tetris.js';

[window.b1, window.b2] = [Board(), Board()];

window.Tiles = Tiles;
window.Piece = Piece;

