function appender(parent) { // Creates function that appends to hgiven element
		return function(newChild) {
			parent.appendChild(newChild);
		};
}

function applyTranslate(elem, x, y) {
		var transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
		elem.style.transform = transform;
}

function addListener(elem, evt, f) {
	elem.addEventListener(evt, f);
}

function onNumberKeyPress (f) {
	return function(evt) {
		var ch = String.fromCharCode(evt.keyCode);
		if (ch >= 0 && ch <= 9 && evt.keyCode !== 13 && evt.keyCode !== 32) {
			f(ch);
		}
	}
}

function tweenSize(el, newWidth, newHeight, animTime, wSuffix, hSuffix) {
	wSuffix = wSuffix || 'vw';
	hSuffix = hSuffix || 'vh';

    return new TWEEN.Tween(size).to({w: newWidth, h: newHeight}, animTime)
    .easing(TWEEN.Easing.Exponential.InOut)
    .onUpdate(function() {
        el.style.width = size.w + wSuffix;
        iframe.style.height = size.h + hSuffix;
    });
}