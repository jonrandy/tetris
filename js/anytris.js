export function Board({
	width = 10,
	height = 40,
	playHeight = 20,
	initialFill = '',
	checkBlock = BlockCheck
} = {}) {

	let
		_self,
		activePieces = [],
		blocks = _makeBlocks(width, height, initialFill),
		blockFits = checkBlock
	;

	function _makeBlocks(w, h, fill) {
		return [...Array(h)].map(() => [...Array(w)].map(() => fill))
	}

	function pieceFits(piece) {
		return piece.tile.states[piece.tileState].every( ([x, y, c]) => {
			c = c || piece.tile.colour;
			x = piece.x + x;
			y = piece.y - y;
			return blockFits(c, blocks[y][x]);
		});
	}

	return _self = {
		width,
		height,
		playHeight,
		activePieces,
		pieceFits
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
		undo
	};

}


export const BlockCheck = (thisBlock, withBoardBlock) => !withBoardBlock ? thisBlock : false;
