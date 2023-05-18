function ControlBar() {
    var div = document.createElement('div');
    div.className = 'controlBar';

    var animTime = 150;

    var inputContainer = document.createElement('div');
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    // input.setAttribute('placeholder', 'Query');
    inputContainer.appendChild(input);


    div.appendChild(inputContainer);

    var active = false; // collapsed by default
    var transform = {translateZ: 0, opacity: 1};
    initCollapse().start();

    input.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13 && isActive()) {
            div.dispatchEvent(new CustomEvent('query', {detail: {query: input.value}}));
            toggle();
        }
    });

    function initExpand() {
         input.focus();
        return new TWEEN.Tween(transform)
            .to({translateZ: 0}, animTime)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onUpdate(() => {
                div.style.transform = 'perspective(500px) translateZ(' + transform.translateZ + 'px)';
            });
    }

    function clearInput() {
        input.value = '';
    }

    function initCollapse() {
        input.blur();
        return new TWEEN.Tween(transform)
            .to({translateZ: 500}, animTime)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(() => {
                div.style.transform = 'perspective(500px) translateZ(' + transform.translateZ + 'px)';
            });
    }

    function initConsume() { // Consuming is like collapsing but the other way
        input.blur();
        // Also tween opacity
          return new TWEEN.Tween(transform)
            .to({translateZ: -2000}, animTime)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(() => {
                div.style.transform = 'perspective(500px) translateZ(' + transform.translateZ + 'px)';
            });
    }

    function toggle(outFunc) {
        outFunc = outFunc || initCollapse;

        if (active) {
            outFunc().start();
        } else {
            initExpand().start();
        }

        clearInput();

        active = !active;
    }

    function isActive() {
        return active;
    }

    this.el = div;
    this.initExpand = initExpand;
    this.initCollapse = initCollapse;
    this.toggle = toggle;
    this.isActive = isActive;
    this.addEventListener = div.addEventListener.bind(div);
}

