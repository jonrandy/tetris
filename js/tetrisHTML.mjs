import { PlayStates as PS } from './anytris.mjs';

export default function({
	skin = 'default',
	document,
	debugMode = false
} = {}) {

	const
		$ = q=>[...document.querySelectorAll(q) ],
		gameArea = $('#board')[0],
		debugOutput = $('#debug')[0]
	;

	function _drawBoard(board, livePiece, target) {
		let blocks = board.allBlocks({ activePieces: [livePiece], cropAtPlayHeight:true });
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

	}

	return Object.freeze({
		update
	});

}