function Bar(x, y, w, h, color) {
    var div = document.createElement('div')
    div.className = 'bar'
    div.style.backgroundColor = color || '#c10a15'

    var size = { w: w, h: h }
    var pos = { x: x, y: y }
    var opacity = { opacity: 1 }

    var curTween
    var animTime = 100
    updatePos()
    updateSize()

    function updateSize() {
        div.style.width = size.w + 'px'
        div.style.height = size.h + 'px'
    }

    function updatePos() {
        div.style.left = pos.x + 'px'
        div.style.top = pos.y + 'px'
    }

    function tweenSize(newW, newH, animTime) {
        return new TWEEN.Tween(size)
            .to({ w: newW, h: newH }, animTime)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(updateSize)
    }

    function tweenOpacity(newOpacity, animTime) {
        return new TWEEN.Tween(opacity)
            .to({ opacity: newOpacity }, animTime)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                div.style.opacity = opacity.opacity
            })
    }

    function tweenPos(newX, newY, animTime) {
        return new TWEEN.Tween(pos)
            .to({ x: newX, y: newY }, animTime)
            .easing(TWEEN.Easing.Cubic.In)
            .onUpdate(updatePos)
    }

    function qTween(tween) {
        if (curTween) {
            curTween.chain(tween)
            curTween = tween
        } else {
            curTween = tween
            curTween.start()
        }
    }

    this.el = div

    this.animate = function (t) {}

    this.tweenPos = tweenPos
    this.tweenSize = tweenSize
    this.tweenOpacity = tweenOpacity
    this.qTween = qTween
}
