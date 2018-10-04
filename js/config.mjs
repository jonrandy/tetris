import { GC } from './gamecontroller.mjs';

const REPEATS = {
	pauseThenSlow:	{ initialRepeatDelay: 10, repeatEvery: 5 },
	none:						{ repeatEvery: 0 },
	continous:			{  },
};


export default {

	CONTROL_REPEAT: {
		[GC.LEFT]:					REPEATS.pauseThenSlow,
		[GC.RIGHT]:					REPEATS.pauseThenSlow,
		[GC.UP]:						REPEATS.none,
		[GC.DOWN]:					REPEATS.continous,
		[GC.BUTTON_A]:			REPEATS.none,
		[GC.BUTTON_B]:			REPEATS.none,
		[GC.BUTTON_SELECT]:	REPEATS.none,
		[GC.BUTTON_START]:	REPEATS.none,
		[GC.BUTTON_QUIT]:		REPEATS.none
	},

	KEYBOARD_CONTROLS : {
		up:						 38,	// Up arrow
		down:					 40,	// Down arrow
		left:					 37,	// Left arrow
		right:				 39,	// Right arrow
		buttonA:			 90,	// Z
		buttonB:			 88,	// X
		buttonSelect:	 9,		// Tab
		buttonStart:	 13,	// Return
		buttonQuit:		 27		// Escape					
	},

	PIECE_STARTPOS: [3, 21]

};



