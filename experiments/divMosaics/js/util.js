function appender(parent) {
    // Creates function that appends to given element
    return function (newChild) {
        parent.appendChild(newChild)
    }
}

function applyTranslate(elem, x, y) {
    var transform = 'translateX(' + x + 'px) translateY(' + y + 'px)'
    elem.style.transform = transform
}

function addListener(elem, evt, f) {
    elem.addEventListener(evt, f)
}

function onNumberKeyPress(f) {
    return function (evt) {
        var ch = String.fromCharCode(evt.keyCode)
        if (ch >= 0 && ch <= 9) {
            f(ch)
        }
    }
}
