
// I'm pretty sure this is how you do an event page...
chrome.windows.onFocusChanged.addListener(function(focusedWindowId) {
	console.log('hitting the listener');
	chrome.windows.getAll({populate: true}, function(windows) {
		var i, j, window, tab;

		for (i = 0; i < windows.length; i++) {
			window = windows[i];

			// TODO: Still have to check what focusedWindowId is set to if Chrome is not focused at all
			if (window.id == focusedWindowId) {
				continue;
			}

			for (j = 0; j < window.tabs.length; j++) {
				tab = window.tabs[j];

				if (!tab.active) {
					continue;
				}

				// Inject our script onto the active tab of each blurred window.
				chrome.tabs.executeScript(tab.id, {file: 'inject.js'});
			}
		}
	});
});
