import { GC } from './gamecontroller.mjs';

const REPEATS = {
	pauseThenSlow:	{ initialRepeatDelay: 10, repeatEvery: 5 },
	none:						{ repeatEvery: 0 },
	continous:			{  },
};


export const Config = {

	CONTROL_REPEAT : {
		[GC.LEFT]:					REPEATS.pauseThenSlow,
		[GC.RIGHT]:					REPEATS.pauseThenSlow,
		[GC.UP]:						REPEATS.none,
		[GC.DOWN]:					REPEATS.continous,
		[GC.BUTTON_A]:			REPEATS.none,
		[GC.BUTTON_SELECT]:	REPEATS.none,
		[GC.BUTTON_START]:	REPEATS.none
	}

};


// Game states
export const PlayStates = {
	PASSIVE: Symbol('passive'),
	ACTIVE: Symbol('active'),
	PAUSED: Symbol('paused')
};
