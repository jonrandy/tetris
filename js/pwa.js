export function registerServiceWorker(jsFile) {

	if('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
		  navigator.serviceWorker
		  .register(jsFile)
		  .then(function() {
		    console.log("Service Worker registered successfully");
		  })
		  .catch(function() {
		    console.log("Service worker registration failed")
		  });
		});
	}

}
