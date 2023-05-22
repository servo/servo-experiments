/* 
    MosaicTile - represents a single mosaic tile.
    TileFactory - for creating and re-using MosaicTile objects.
*/

// Object representing a single mosaic tile.
function MosaicTile(x, y, w, h, color) {
    var div = document.createElement('div')
    div.className = 'mosaic-tile'

    var size = { w: w, h: h }
    var pos = { x: x, y: y }
    var animTime = 1000 // as defined in .mosaic-tile CSS

    setPos(pos.x, pos.y)
    setSize(size.w, size.h)
    setColor(color)

    function setPos(x, y) {
        pos.x = x
        pos.y = y
        div.style.left = pos.x + 'px'
        div.style.top = pos.y + 'px'
    }

    function setSize(w, h) {
        size.w = w
        size.h = h
        div.style.width = size.w + 'px'
        div.style.height = size.h + 'px'
    }

    function setColor(color) {
        div.style.backgroundColor = color
    }

    function animateToPosition(newX, newY, onComplete) {
        setTimeout(() => {
            setPos(newX, newY)
            setTimeout(onComplete, animTime)
        }, 10)
    }

    function hide() {
        div.style.visibility = 'hidden'
        div.style.background = 'none'
    }

    function show() {
        div.style.visibility = 'visible'
    }

    this.pos = pos

    this.setPos = setPos
    this.animateToPosition = animateToPosition

    this.setSize = setSize

    this.setColor = setColor

    this.hide = hide
    this.show = show

    this.el = div
}

// Provides an available tile tiles, reusing ones where possible
function TileFactory() {
    var free = [] // List of tiles which are free to be re used
    var tileCount = 0

    function tile(x, y, w, h, color) {
        var tile
        if (free.length > 0) {
            // Find a free tile for re-use.
            tile = free.shift() // Get a free tile and remove it from free list.

            // Configure the tile as requested.
            tile.setPos(x, y)
            tile.setSize(w, h)
            tile.setColor(color)
        } else {
            // There are no tiles for re-use, so create a new one.
            tile = new MosaicTile(x, y, w, h, color)
        }

        return tile
    }

    // Populate with n readily-availabe tiles.
    function populate(n) {
        for (var i = 0; i < n; i++) {
            free.push(new Tile(0, 0, 0, 0, 'red'))
        }

        return this
    }

    this.tile = tile
    this.markAsAvailable = function (tile) {
        // This function signals that a given tile can be re-used.
        free.push(tile) // Add the tile to the pool of 'free' tiles.
    }
    this.populate = populate
}
