window.LiveGraph =
    window.LiveGraph ||
    (function () {
        var defaultTheme = {
            fg: '#07FAFF',
            bg: '#232323',
        }

        function LiveGraph(el, options) {
            options = options || {}

            if (!options.maxY) {
                throw new Error('LiveGraph: yRange required.')
            }

            if (
                !options.theme ||
                (options.theme && !(options.theme.fg && options.theme.bg))
            ) {
                options.theme = defaultTheme
            }

            let width = options.width || 600
            let height = options.height || 380

            let theme = options.theme

            let labelText = options.label || 'Value'
            let labelUnit = options.units || ''

            /* Init container */
            let container = document.createElement('div')
            container.classList.add('livegraph-container')
            container.style.backgroundColor = theme.bg
            container.style.color = theme.fg

            container.style.width = width + 'px'
            /* Create canvas */

            let canvasContainer = document.createElement('div')
            canvasContainer.classList.add('livegraph-canvas-container')
            canvasContainer.style.backgroundColor = theme.bg
            canvasContainer.style.width = width + 'px'
            canvasContainer.style.height = height + 'px'

            let canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d')

            canvas.width = width
            canvas.height = height

            ctx.strokeStyle = theme.fg

            canvasContainer.appendChild(canvas)

            container.appendChild(canvasContainer)
            let buffer = document.createElement('canvas'),
                bufferCtx = buffer.getContext('2d')

            let label = document.createElement('label')
            container.appendChild(label)

            /* Now add container to the target el */
            el.appendChild(container)

            this.canvas = canvas
            this.ctx = ctx
            this.yRange = [options.minY || 0, options.maxY]
            this.prevPoint = [0, canvas.height]

            this.translate = function (tx, ty) {
                buffer.width = canvas.width
                buffer.height = canvas.height

                // Save canvas
                bufferCtx.clearRect(0, 0, buffer.width, buffer.height)
                bufferCtx.drawImage(canvas, 0, 0)

                // Clear canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.save() // Save the non-translated canvas so it can be restored

                // Translate and re draw
                ctx.translate(tx || 0, ty || 0)
                this.clearDisplay() // Fills bg with transparency

                ctx.drawImage(buffer, 0, 0)

                // Clear translation
                ctx.restore()
            }

            this.clearDisplay = function () {
                ctx.fillStyle = 'rgba(0, 0, 0, 0)'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            this.updateLabel = function (val) {
                label.textContent = labelText + ': ' + val + ' ' + labelUnit
            }
            this.updateLabel('-')
        }

        LiveGraph.prototype.timePlot = function (y) {
            let cv = this.canvas,
                ctx = this.ctx

            let [prevX, prevY] = this.prevPoint

            let canvasX = prevX + 1
            let canvasY = (
                cv.height -
                ((y - this.yRange[0]) / (this.yRange[1] - this.yRange[0])) *
                    cv.height
            ).toFixed(2)

            if (canvasX > cv.width) {
                this.translate(-1, 0)
                prevX = cv.width - 1
                canvasX = cv.width
            }

            ctx.beginPath()
            ctx.moveTo(prevX, prevY)
            ctx.lineTo(canvasX, canvasY)

            ctx.stroke()
            ctx.closePath()

            this.prevPoint = [canvasX, canvasY]
            this.updateLabel(Math.round(y))
        }

        LiveGraph.prototype.timePlotMultiple = function (ys) {
            ys.forEach(this.timePlot.bind(this))
        }

        LiveGraph.prototype.clear = function () {
            let cv = this.canvas,
                ctx = this.ctx
            this.prevPoint = [0, cv.height]
            this.clearDisplay()
        }

        return LiveGraph
    })()
