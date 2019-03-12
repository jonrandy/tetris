import { PlayStates as PS } from './anytris.mjs';

export default function({
	skin = 'default',
	document,
	CFG = {}
} = {}) {

	const
		$ = q=>[...document.querySelectorAll(q) ],
		$_ = q=>$(q)[0],
		boardContainer = $_('#board'),
		msgArea = $_('#msg'),
		infoArea = $_('#info'),
		scoreVal = $_('#score>.val'),
		levelVal = $_('#level>.val'),
		nextPieceIndicator = $_('#nextBlock'),
		boardDivs = _makeBoardDivs(boardContainer)
	;

	let
		_score,
		_lastNextType,
		_highScore,
		_lastUpdate
	;

	function _makeBoardDivs(container) {
		let i;
		for (i=0; i<200; i++) container.appendChild(document.createElement('div'));
		return $('#board div');
	}

	function _drawBoard(blocks, livePiece, divArr) {
		let flat = blocks.reverse().reduce((arr,row)=>arr.concat(row));
		!infoArea.className && (infoArea.className = 'on');
		flat.forEach((col, idx) => divArr[idx].className = col ? 'on' : '');
	}

	function _showMessage(message) {
		msgArea.innerHTML = message + (_highScore ? ('<br>'+CFG.MSG_HIGHSCORE+': '+_highScore) : '');
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
		msg = '',
		highScore = 0
	} = {}) {

		let
			blocks = board.allBlocks({ activePieces: piece && [piece], cropAtPlayHeight:true }),
			newUpdate = JSON.stringify({
				...arguments[0],
				blocks
			})
		;
		if (_lastUpdate==newUpdate) return false;
		_lastUpdate = newUpdate;

		_highScore = highScore;
		_showMessage(msg);
		if (state==PS.ACTIVE) _drawBoard(blocks, piece, boardDivs);

		let nextPieceType = nextPieces && nextPieces.pieces[0].tile.type;

		if (score!=_score || _lastNextType!==nextPieceType) {
			_lastNextType = nextPieceType;
			_score = score;
			nextPieceIndicator.className = 't'+nextPieceType;
			scoreVal.innerHTML = score;
			levelVal.innerHTML = level;
		}

		return true;

	}

	return Object.freeze({
		update
	});

}