
chrome.windows.onFocusChanged.addListener(function(focusedWindowId)
{
	if (localStorage['disable'] == 'true') {  // temp
		console.log('disabled');
		return;
	}
	
	// We can't do anything if we don't know what the last window was yet.
	if (typeof localStorage['last_window'] == 'undefined') {
		localStorage['last_window'] = focusedWindowId;
		console.log('no last window... bailing');
		return;
	}
	
	// Let's avoid inking out our view (on another monitor, for instance) if we're switching outside Chrome.
	if (focusedWindowId == -1) {
		console.log('closed a window and ended up OUTSIDE Chrome... bailing', blurredWindowId);
		// TODO: Maybe do a check here to see if last_window is gone before deleting it?  Maybe -1 still happens sometimes just by switching.
		delete localStorage['last_window'];  // User closed a window, so we've lost our "history."
		return;
	}

	var blurredWindowId = parseInt(localStorage['last_window'], 10);

	// If we're just returning to the same window again, we shouldn't touch it.
	if (blurredWindowId == focusedWindowId) {
		console.log('switched back to the SAME window... bailing');
		return;
	}
	
	chrome.windows.get(focusedWindowId, {populate: true}, function(focusedWindow)
	{
		var tabs = focusedWindow.tabs;

		// TODO: Consider checking type == 'popup' instead, but does anything else use 'popup'? (And probably 'panel' if it's docked, I'm guessing.)
		// Chrome Dev Tools doesn't count as a window.
		if (tabs.length == 1 && tabs[0].url.indexOf('chrome-devtools://') == 0) {
			// TODO: If we can figure out which tab/window this devtools instance is for, it would be cool to mimic it!
			console.log('trying to blur after switching to devtools... bailing');
			return;
		}
		
		// Finally, let's get a hold of the previous (blurred) window and label it.
		chrome.windows.get(blurredWindowId, {populate: true}, function(blurredWindow)
		{
			var i, blurredTab;
			
			// TODO: This was happening sometimes, but I think I fixed it.  We'll see.
			if (typeof blurredWindow == 'undefined') {
				localStorage['last_window'] = focusedWindowId;
				return;
			}

			// Okay, time to find the active tab and drop a label on it.
			for (i = 0; i < blurredWindow.tabs.length; i++) {
				blurredTab = blurredWindow.tabs[i];

				// Nah dawg, this one ain't it.
				if (!blurredTab.active) {
					continue;
				}
				
				console.log('aww yeah, let\'s do this sheeit', blurredWindow.id, blurredTab.id, blurredWindow.type, blurredTab.url);

				// Found it!! Inject our script onto the active tab of the freshly blurred window.
				chrome.tabs.executeScript(blurredTab.id, {file: 'inject.js'});

				// And of course, inform future-us that our current window is their past window.
				localStorage['last_window'] = focusedWindowId;
			}
		});
		
		// TODO: Don't forget to REMOVE the label from the newly focused window, if there is one.
	});
});
