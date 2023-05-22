function ServoStats() {
    // http://stackoverflow.com/a/5111475/4606996

    var getNow = makeGetNowFunction()

    // The higher this value, the less the fps will reflect temporary variations
    // A value of 1 will only keep the last value
    var filterStrength = 20

    var lastTime = getNow(),
        frameTime = 0,
        lastRecordTime = getNow()

    var pollTime = 1000 // Poll frequency in ms for taking FPS measurement

    var fps = 0.0

    var onUpdateCbs = []

    var el = document.createElement('div')
    el.className = 'servo-stats'
    //el.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000;background:#f00;color:#fff;';
    var avgFpsEl = document.createElement('span')
    var fpsEl = document.createElement('span')
    var msEl = document.createElement('span')
    var ul = document.createElement('ul')
    // ['avg fps', avgFpsEl]
    ;[
        ['fps', fpsEl],
        ['ms', msEl],
    ].forEach(pair => {
        var title = document.createElement('span')
        title.innerHTML = pair[0] + ': '

        var li = document.createElement('li')
        ul.appendChild(li)
        li.appendChild(title)
        li.appendChild(pair[1])
    })
    el.appendChild(ul)

    this.dom = document.createElement('div') || el // CURRENTLY DISABLED

    this.start = function () {}

    this.end = function () {
        var currTime = getNow()

        var thisFrameTime = currTime - lastTime
        frameTime += (thisFrameTime - frameTime) / filterStrength

        lastTime = currTime

        // Record fps every second
        if (currTime - lastRecordTime >= pollTime) {
            fps = (1000 / frameTime).toFixed(1)
            lastRecordTime = currTime
        }
    }

    this.update = function () {
        // avgFpsEl.innerHTML = Math.round(avgFps);
        // fpsEl.innerHTML = Math.round(fps);
        // msEl.innerHTML = Math.round(ms);

        onUpdateCbs.forEach(function (f) {
            f(fps)
        })
    }

    this.onUpdate = function (f) {
        onUpdateCbs.push(f)
    }

    function makeGetNowFunction() {
        var timerObject = performance || Date
        return function () {
            return timerObject.now()
        }
    }
}
