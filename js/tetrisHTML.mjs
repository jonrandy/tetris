import { PlayStates as PS } from './anytris.mjs';

export default function({
	skin = 'default',
	document,
	debugMode = false
} = {}) {

	const
		$ = q=>[...document.querySelectorAll(q) ],
		boardContainer = $('#board')[0],
		msgArea = $('#msg')[0],
		debugOutput = $('#debug')[0],
		nextPieceIndicator = $('#nextBlock')[0],
		boardDivs = _makeBoardDivs(boardContainer)
	;

	let
		_score,
		_lastNextType
	;

	function _makeBoardDivs(container) {
		let i;
		for (i=0; i<200; i++) container.appendChild(document.createElement('div'));
		return $('#board div');
	}

	function _drawBoard(board, livePiece, divArr) {
		let
			blocks = board.allBlocks({ activePieces: livePiece && [livePiece], cropAtPlayHeight:true }),
			flat = blocks.reverse().reduce((arr,row)=>arr.concat(row))
		;
		flat.forEach((col, idx) => divArr[idx].className = col ? 'on' : '');
	}

	function _showMessage(message) {
		msgArea.innerHTML = message;
		msgArea.className = message ? 'on' : '';
		boardContainer.className = message ? 'msg' : '';
	}

	function update({
		score,
		state,
		board,
		piece,
		nextPieces,
		level,
		action,
		msg = ''
	} = {}) {

		_showMessage(msg);
		if (state==PS.ACTIVE) _drawBoard(board, piece, boardDivs);

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