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
		blockFits();
		// TODO - fill in
	}

	function test() {
		console.log(blocks);
	}

	return _self = {
		width,
		height,
		test,
		activePieces
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
