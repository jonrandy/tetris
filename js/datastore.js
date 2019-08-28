export { DataStore as default };

function DataStore({
	Driver = CookieDriver			
} = {}) {

	let _driver = Driver();

	return Object.freeze({
		set: (key,value) => _driver.store(key, value),
		get: (key) => _driver.retrieve(key)
	});

}


export function CookieDriver() {

	const
		RETAIN_SECONDS = 60*60*24*365, // keep data for a year
		COOKIE_NAME = 'data'
	;

	function _currentObj() {
		var cookieStr = document.cookie.replace(COOKIE_NAME + '=', '');
		return JSON.parse(cookieStr || '{}');
	}

	return Object.freeze({
		store(key, value) {
			let obj = _currentObj();
			obj[key] = value;
      document.cookie = COOKIE_NAME + '=' + JSON.stringify(obj) + ';max-age=' + RETAIN_SECONDS;
			return value;
		},
		retrieve(key) {
			return _currentObj()[key];
		}
	});

}
