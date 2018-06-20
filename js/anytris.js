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
		return [...Array(h)].map(() => [...Array(w)].map(() => fill))
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

	// I
	{
		colour: 5, // cyan
		states: [
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 3, y: 1 }
			],
			[
				{ x: 2, y: 0 },
				{ x: 2, y: 1 },
				{ x: 2, y: 2 },
				{ x: 2, y: 3 }
			],
			[
				{ x: 0, y: 2 },
				{ x: 1, y: 2 },
				{ x: 2, y: 2 },
				{ x: 3, y: 2 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 },
				{ x: 1, y: 3 }
			]
		]
	},

	// J
	{
		colour: 1, // blue
		states: [
			[
				{ x: 0, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 2, y: 0 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 2, y: 2 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 0, y: 2 },
				{ x: 1, y: 2 }
			]
		]
	},

	// L
	{
		colour: 6, // orange/brown
		states: [
			[
				{ x: 2, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 2, y: 2 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 0, y: 2 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 0, y: 0 },
				{ x: 1, y: 2 }
			]
		]
	},

	// O
	{
		colour: 14, // yellow
		states: [
			[
				{ x: 1, y: 0 },
				{ x: 2, y: 0 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			]
		]
	},

	// S
	{
		colour: 10, // green
		states: [
			[
				{ x: 1, y: 0 },
				{ x: 2, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 2, y: 2 }
			],
			[
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 0, y: 2 },
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 }
			]
		]
	},

	// T
	{
		colour: 13, // purple
		states: [
			[
				{ x: 1, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 1, y: 2 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 }
			]
		]
	},

	// Z
	{
		colour: 2, // red
		states: [
			[
				{ x: 0, y: 0 },
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 }
			],
			[
				{ x: 2, y: 0 },
				{ x: 1, y: 1 },
				{ x: 2, y: 1 },
				{ x: 1, y: 2 }
			],
			[
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 },
				{ x: 2, y: 2 }
			],
			[
				{ x: 1, y: 0 },
				{ x: 0, y: 1 },
				{ x: 1, y: 1 },
				{ x: 0, y: 2 }
			]
		]
	}



];
