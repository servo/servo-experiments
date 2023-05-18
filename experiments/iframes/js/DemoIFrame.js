// Wraps IFrame
function DemoIFrame(url) {
    var dormant = true;
    var iframe = document.createElement('iframe');
    iframe.style.display = 'block';
    iframe.className = 'dormant';
    iframe.src = url;
    iframe.innerText = url;

    var animTime = 150;
    var size = {w: 0, h: 0};
    var pos = {x: 0, y: 0};
    this.el = iframe;

    function tweenSize(newWidth, newHeight, animTime) {
        return new TWEEN.Tween(size).to({w: newWidth, h: newHeight}, animTime)
        .easing(TWEEN.Easing.Exponential.InOut)
        .onUpdate(function() {
            iframe.style.width = size.w + 'vw';
            iframe.style.height = size.h + 'vh';
        });
    }

    function tweenPos(newX, newY, animTime) {
        return new TWEEN.Tween(pos).to({x: newX, y: newY}, animTime)
        .easing(TWEEN.Easing.Exponential.InOut)
        .onUpdate(function() {
            iframe.style.left = pos.x + '%';
            iframe.style.top = pos.y + '%';
        });
    }    
    this.toggleDormant = function() {
        dormant = !dormant;
        iframe.className = dormant ? 'dormant' : '';
    };

    this.collapse = function() {
        // return tweenSize(0, 0, animTime);
        return tweenPos(100, 0, animTime);
    };

    this.expand = function() {
        // return tweenSize(100, 100, animTime);
        pos.x = -100;
        pos.y = 0;
        return tweenPos(0, 0, animTime);
    };

    this.animate = function(t) {
    };
}