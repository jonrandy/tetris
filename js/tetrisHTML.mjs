import { PlayStates as PS } from './anytris.mjs';

export default function({
	skin = 'default',
	document,
	debugMode = false
} = {}) {

	function update({
		score,
		state,
		board,
		piece,
		nextPieces,
		level,
		action
	}) {

		action && console.log(action, state, Math.random());

	}

	return Object.freeze({
		update
	});

}