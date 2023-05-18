function NotificationService(notificationTimeout) {
    var el = document.createElement('div');
    el.className = 'notificationBar';

    var timeout = notificationTimeout || 2000; // Time before a notification disappears
    var transitionTime = 250; // Time for sliding transition to complete
    var waitTime = 250; // Minimum time inbetween notifications
    var expandedHeight = 24;
    var expandedPaddingTop = 6;
    var p = Promise.resolve();

    var transition = {
        h: 0,
        pt: 0
    }

    function updateEl() {
        el.style.paddingTop = transition.pt + 'px';
        el.style.height = transition.h + 'px';
    }

   
    function initExpand() {
        return new TWEEN.Tween(transition)
            .to({h: expandedHeight, pt: expandedPaddingTop}, transitionTime)
            .easing(TWEEN.Easing.Sinusoidal.In)
            .onUpdate(updateEl);

    }

    function initCollapse() {
        return new TWEEN.Tween(transition)
            .to({h: 0, pt: 0}, transitionTime)
            .easing(TWEEN.Easing.Sinusoidal.Out)
            .onUpdate(updateEl);
    }

    function displayMsg(msg) {
        return new Promise((resolve, reject) => {
            el.innerHTML = msg;
            var expandTween = initExpand();

            expandTween.onComplete(() => {
                // Wait before collapsing
                setTimeout(() => {
                    var collapseTween = initCollapse();
                    collapseTween.onComplete(() => {
                        el.innerHTML = '';
                        setTimeout(resolve, waitTime)
                    });
                    collapseTween.start();
                }, timeout);

                    
            })
            
            expandTween.start();
            
        });
    }

    function emit(msg) {
        p.then(() => {
            p = displayMsg(msg);
            return p;
        });
    }

    this.el = el;
    this.emit = emit;
}