export const Tetrominos = [

	// I
	{
		type: 5, // cyan
		states: [
			[
				[ 0, 2 ],
				[ 1, 2 ],
				[ 2, 2 ],
				[ 3, 2 ]
			],
			[
				[ 2, 0 ],
				[ 2, 1 ],
				[ 2, 2 ],
				[ 2, 3 ]
			]
		]
	},

	// J
	{
		type: 1, // blue
		states: [
			[
				[ 0, 1 ],
				[ 1, 1 ],
				[ 2, 1 ],
				[ 2, 2 ]
			],
			[
				[ 1, 0 ],
				[ 1, 1 ],
				[ 0, 2 ],
				[ 1, 2 ]
			],
			[
				[ 0, 0 ],
				[ 0, 1 ],
				[ 1, 1 ],
				[ 2, 1 ]
			],
			[
				[ 1, 0 ],
				[ 2, 0 ],
				[ 1, 1 ],
				[ 1, 2 ]
			]
		]
	},

	// L
	{
		type: 6, // orange/brown
		states: [
			[
				[ 0, 1 ],
				[ 1, 1 ],
				[ 2, 1 ],
				[ 0, 2 ]
			],
			[
				[ 1, 0 ],
				[ 1, 1 ],
				[ 0, 0 ],
				[ 1, 2 ]
			],
			[
				[ 2, 0 ],
				[ 0, 1 ],
				[ 1, 1 ],
				[ 2, 1 ]
			],
			[
				[ 1, 0 ],
				[ 2, 2 ],
				[ 1, 1 ],
				[ 1, 2 ]
			]
		]
	},

	// O
	{
		type: 14, // yellow
		states: [
			[
				[ 1, 1 ],
				[ 2, 1 ],
				[ 1, 2 ],
				[ 2, 2 ]
			]
		]
	},

	// S
	{
		type: 10, // green
		states: [
			[
				[ 1, 1 ],
				[ 2, 1 ],
				[ 0, 2 ],
				[ 1, 2 ]
			],
			[
				[ 1, 0 ],
				[ 1, 1 ],
				[ 2, 1 ],
				[ 2, 2 ]
			]
		]
	},

	// T
	{
		type: 13, // purple
		states: [
			[
				[ 0, 1 ],
				[ 1, 1 ],
				[ 2, 1 ],
				[ 1, 2 ]
			],
			[
				[ 1, 0 ],
				[ 0, 1 ],
				[ 1, 1 ],
				[ 1, 2 ]
			],
			[
				[ 1, 0 ],
				[ 0, 1 ],
				[ 1, 1 ],
				[ 2, 1 ]
			],
			[
				[ 1, 0 ],
				[ 1, 1 ],
				[ 2, 1 ],
				[ 1, 2 ]
			],
		]
	},

	// Z
	{
		type: 2, // red
		states: [
			[
				[ 0, 1 ],
				[ 1, 1 ],
				[ 1, 2 ],
				[ 2, 2 ]
			],
			[
				[ 2, 0 ],
				[ 1, 1 ],
				[ 2, 1 ],
				[ 1, 2 ]
			]
		]
	}



];