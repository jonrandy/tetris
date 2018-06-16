export function Board({
	width = 10,
	height = 40,
	playHeight = 20,
	initialFill = ''
} = {}) {

	let
		_self,
		activePieces = [],
		blocks = _makeBlocks(width, height, initialFill)
	;

	function _makeBlocks(w, h, fill) {
		return [...Array(h)].map(e => [...Array(w)].map(e => fill))
	}

	function pieceFits(piece) {

	}

	function test() {
		console.log(blocks);
	}

	return _self = Object.seal({
		width,
		height,
		test
	});

}


export function Piece() {

	let
		x,
		y,
		shape,
		state
	;

	function rotate(dir) {

	}

	function move(destX, destY) {

	}

	function moveRel(dx, dy) {

	}

}


export const Shapes = [

	{
		states: [
			[ 'x1', 'y1', 'c1'],
			[ 'x2', 'y2', 'c2'],
			[ 'x3', 'y3', 'c3'],
		]
	}

];
