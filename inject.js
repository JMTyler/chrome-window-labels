
// Don't judge.

console.log('injecting a new label');

var myDiv = document.createElement('div');
myDiv.id = 'jared_div';
myDiv.style.backgroundColor = 'black';
myDiv.style.width = '1100px';
myDiv.style.height = '475px';
myDiv.style.border = '40px solid';
myDiv.style.color = 'white';
myDiv.style.fontWeight = 'bold';
myDiv.style.fontFamily = 'monospace';
myDiv.style.textAlign = 'center';
myDiv.style.position = 'fixed';
myDiv.style.borderTopColor = '#DDD';
myDiv.style.borderLeftColor = '#DDD';
myDiv.style.borderBottomColor = '#888';
myDiv.style.borderRightColor = '#888';
myDiv.style.zIndex = '100000000000000000000000';

var mySpan = document.createElement('span');
mySpan.innerHTML = "TEST";
mySpan.style.position = 'relative';
mySpan.style.top = '112px';
mySpan.style.fontSize = '158px';

myDiv.appendChild(mySpan);
document.body.appendChild(myDiv);

myDiv.style.top = (window.innerHeight - myDiv.clientHeight) / 2 + 'px';
myDiv.style.left = (window.innerWidth - myDiv.clientWidth) / 2 + 'px';
