export const BlockCheck = (thisBlockType, withBoardBlockType) => !withBoardBlockType ? thisBlockType : false;

export function Board({
	width = 10,
	height = 40,
	playHeight = 20,
	initialFill = '',
	checkBlock = BlockCheck
} = {}) {

	let
		_self,
		blockTypeArr = _makeBlockTypeArr(width, height, initialFill),
		blockFits = checkBlock
	;

	function _makeBlockTypeArr(w, h, fill) {
		return [...Array(h)].map(() => [...Array(w)].map(() => fill))
	}

	function pieceFits(piece, onBlockChecked = false) {
		return piece.tile.states[piece.tileState].every( (block) => {
			let final = _pieceBlock(piece, block);
			onBlockChecked && onBlockChecked(final);
			return final[2];
		});
	}

	function freeze(pieces) {
		blockTypeArr = allBlocks({ cropAtPlayHeight: false, activePieces: pieces });
	}

	function _pieceBlock(piece, block) {
		let
			blockDets = piece.blockDetail(block),
			x = piece.x + blockDets.x,
			y = piece.y - blockDets.y
		;
		return [x, y, (x>=0 && y>=0 && x<_self.width && y<_self.height) && blockFits(blockDets.type, blockTypeArr[y][x])];
	}

	function allBlocks({
		activePieces = false,
		cropAtPlayHeight = true,
		rotate = false
	} = {}) {
		let all = blockTypeArr.map((row) => row.slice());
		if (activePieces) {
			if (!Array.isArray(activePieces)) activePieces = [activePieces];
			activePieces.forEach( (piece) => 
				pieceFits(piece, ( [x,y,t] ) => { if (t!==false) all[y][x] = t; })
			);
		}

		all = cropAtPlayHeight ? all.slice(0, _self.playHeight) : all;

		return rotate ? all[0].map((col, i) => all.map(row => row[i])) : all;
	}

	return _self = {
		width,
		height,
		playHeight,
		pieceFits,
		allBlocks,
		freeze
	};

}


export function Piece({
	x,
	y,
	tile,
	tileState = 0
}) {

	let
		_self,
		_lastX,
		_lastY,
		_lastTileState
	;

	function blockDetail(block) {
		let [x, y, t] = block;
		return {
			x,
			y,
			type : t || _self.tile.type
		}
	}

	function rotate(dir=1) {
		_saveLast();
		_self.tileState = (_self.tileState + _self.tile.states.length + dir) % _self.tile.states.length;
		return _self;
	}

	function move(destX, destY) {
		_saveLast();
		[_self.x, _self.y] = [destX, destY];
		return _self;
	}

	function moveRel(dx, dy) {
		return move(_self.x+dx, _self.y+dy);
	}

	function undo() {
		[_self.x, _self.y, _self.tileState] = [_lastX, _lastY, _lastTileState];
		return _self;
	}

	function _saveLast() {
		[_lastX, _lastY, _lastTileState] = [_self.x, _self.y, _self.tileState];
	}

	return _self = {
		x,
		y,
		tile,
		tileState,
		rotate,
		move,
		moveRel,
		undo,
		blockDetail
	};

}


