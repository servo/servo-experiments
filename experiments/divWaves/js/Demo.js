function Demo() {
    var el = document.createElement('div')
    var bars = []

    function addBar(x, y, w, h, color) {
        var b = new Bar(x, y, w, h, color)
        el.appendChild(b.el)
        bars.push(b)
    }

    var barWidth = 2
    var nBars = Math.round(document.body.clientWidth / barWidth)
    var calcBarHeight = (function () {
        var sx = 20
        var sy = 200
        return x => {
            return Math.abs(Math.sin(x * sx)) * sy
        }
    })()

    _.times(nBars, i => {
        var x = (i / nBars) * Math.PI
        barHeight = calcBarHeight(x)
        addBar(
            barWidth * i,
            0,
            barWidth,
            barHeight,
            randomColor({ hue: 'blue' })
        )
    })

    var tx = 0

    this.animate = function (t) {
        TWEEN.update(t)
        bars.forEach((bar, i) => {
            var x = (i / nBars) * Math.PI
            var newHeight = calcBarHeight(x + tx)
            bar.qTween(bar.tweenSize(barWidth, newHeight, 100))
        })
        tx = (tx + 0.001) % 360
    }

    this.dom = el
}
