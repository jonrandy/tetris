import { GC } from './gamecontroller.mjs';

const REPEATS = {
	pauseThenSlow:	{ initialRepeatDelay: 32, repeatEvery: 12 },
	none:						{ repeatEvery: 0 },
	fastFall:				{ repeatEvery: 12 }
};


export default {

	CONTROL_REPEAT: {
		[GC.LEFT]:					REPEATS.pauseThenSlow,
		[GC.RIGHT]:					REPEATS.pauseThenSlow,
		[GC.UP]:						REPEATS.none,
		[GC.DOWN]:					REPEATS.fastFall,
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
		buttonB:			 32,	// Space
		buttonSelect:	 9,		// Tab
		buttonStart:	 13,	// Return
		buttonQuit:		 27		// Escape					
	},

	PIECE_STARTPOS: [3, 22],

	MSG_INFO: "Arrows + Space<br>ESC Pause",
	MSG_PAUSED: "Paused",
	MSG_GAMEOVER: "Game Over"

};



