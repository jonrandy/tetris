import { PlayStates as PS } from './anytris.mjs';

export default function({
	skin = 'default',
	document,
	debugMode = false
} = {}) {

	const
		$ = q=>[...document.querySelectorAll(q) ],
		gameArea = $('#board')[0],
		debugOutput = $('#debug')[0],
		nextPieceIndicator = $('#nextBlock')[0]
	;

	let
		_score,
		_lastNextType
	;

	function _drawBoard(board, livePiece, target) {
		let blocks = board.allBlocks({ activePieces: livePiece && [livePiece], cropAtPlayHeight:true });
		target.value = blocks.reverse().map( row => '     '+row.map( col => col?'X':'.' ).join('')).join("\n");
	}

	function update({
		score,
		state,
		board,
		piece,
		nextPieces,
		level,
		action
	}) {

		// action && console.log(action, state, Math.random());
		if (state==PS.ACTIVE) _drawBoard(board, piece, gameArea);

		let nextPieceType = nextPieces && nextPieces.pieces[0].tile.type;

		if (score!=_score || _lastNextType!==nextPieceType) {
			_lastNextType = nextPieceType;
			_score = score;
			nextPieceIndicator.className = 't'+nextPieceType;
			debugOutput.value = "Score: "+score+"\nLevel: "+level;
		}

	}

	return Object.freeze({
		update
	});

}