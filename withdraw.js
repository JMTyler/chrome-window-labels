
console.log('trying to withdraw');

// In an ideal world, there should never be two of these on one page... we'll see if my code is ideal.
var windowLabel = document.getElementById('jared_div');
if (windowLabel) {
	document.body.removeChild(windowLabel);
}
