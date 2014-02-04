
console.log('trying to withdraw');

// In an ideal world, there should never be two of these on one page... we'll see if my code is ideal.
// Okay, turns out, sometimes, if I'm mucking around, multiple labels DO get injected... not sure how.
var windowLabel = document.getElementById('jared_div');
if (windowLabel) {
	document.body.removeChild(windowLabel);
}
