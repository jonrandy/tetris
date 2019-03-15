export default function({
	repeatEvery = 1,
	initialRepeatDelay = 0,
	onValue = true,
	offValue = false			
} = {}) {

	let
		counter = 0,
		countdown = initialRepeatDelay ? initialRepeatDelay + 1 : 0
	;

	function value() {
		if (countdown) {
			countdown--;
			return (initialRepeatDelay - countdown) ? offValue : onValue;
		} else {
			var ret = counter ? offValue : onValue;
			counter = repeatEvery ? (++counter % repeatEvery) : 1;
			return ret;
		}
	}

	return Object.freeze({
		value,
		on: value // alt name
	});

}