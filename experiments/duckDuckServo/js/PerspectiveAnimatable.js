// Makes elem toggle-able with a smooth perspective animation for expanding/collapsing
function PerspectiveAnimatable(elem, animTime) { 
    var animTime = animTime || 800;
    var active = false; // Collapsed by default
    
    var transform = {translateZ: 500};
    updateTransform();

    function updateTransform() {
        // Updates the elements transform styling match the transform object
        elem.style.transform = 'perspective(500px) translateZ(' + transform.translateZ + 'px)';
    }

    function initCollapse() {
        return new TWEEN.Tween(transform)
            .to({translateZ: 500}, animTime)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(updateTransform);
    }

    function initExpand() {
        return new TWEEN.Tween(transform)
            .to({translateZ: 0}, animTime)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onUpdate(updateTransform);
    }

    function toggle(onComplete) {
        var tween = active ? initCollapse() : initExpand();
        if (onComplete) {
            tween.onComplete(onComplete);
        }
        tween.start();
        active = !active;
    }

    function isActive() {
        return active;
    }

    function transitionZ(newZ) {
        return new TWEEN.Tween(transform)
            .to({translateZ: newZ})
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(updateTransform);
    }

    this.el = elem;
    this.toggle = toggle;
    this.isActive = isActive;
    this.addEventListener = elem.addEventListener.bind(elem);
    this.transitionZ = transitionZ;
}