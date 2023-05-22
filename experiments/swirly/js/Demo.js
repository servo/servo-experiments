var stage = {
    width: window.innerWidth,
    height: window.innerHeight,
}

function Demo() {
    var el = document.createElement('div')

    var rainBlocks = []
    _.times(20, () => {
        setTimeout(() => {
            _.times(20, () => {
                var r = new Block(_.random(0, stage.width), 0)
                r.mass = _.random(1, 5)
                rainBlocks.push(r)
                el.appendChild(r.el)
            })
        }, _.random(0, 500))
    })

    function Block(xInitial, yInitial) {
        var el = document.createElement('div')
        el.setAttribute('class', 'block')

        this.friction = 1

        this.mass = 1

        ;(this.x = xInitial), (this.y = yInitial)

        ;(this.vx = 0), (this.vy = 0)

        this.ax = 0
        this.ay = 0

        this.animate = function (t) {
            this.vx += this.ax / this.mass
            this.vy += this.ay / this.mass

            this.vx *= this.friction
            this.vy *= this.friction
            this.x += this.vx
            this.y += this.vy

            if (this.y > stage.height) {
                this.y = -50
                this.ax = 0
                this.ay = 0
                this.vx = 0
                this.vy = 0
            }

            el.style.left = this.x - 10 + 'px'
            el.style.top = this.y - 10 + 'px'
        }

        this.el = el
    }

    this.animate = function (t) {
        rainBlocks.forEach(r => {
            r.ay += 0.1
            r.animate(t)
        })
    }
    this.dom = el
}
