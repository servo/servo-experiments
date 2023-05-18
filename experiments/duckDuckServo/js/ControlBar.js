function ControlBar() {
    var animTime = 200;

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.className = 'controlBar';
    input.setAttribute('placeholder', 'DuckDuckServo');

    div = input;

    var pa = new PerspectiveAnimatable(input, animTime);

    input.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13 && pa.isActive()) {
            input.dispatchEvent(new CustomEvent('query', {detail: {query: input.value}}));
            toggle();
            clearInput();
        }
    });

    function clearInput() {
        input.value = '';
    }

    function toggle() {
        pa.toggle();
        if (pa.isActive()) {
            input.focus();
        } else {
            input.blur();
        }
    }

    this.el = input;

    this.toggle = toggle;
    this.isActive = pa.isActive.bind(pa);
    
    this.addEventListener = div.addEventListener.bind(div);
}

