function mouseEffect(numBlocks, blockFunc) {
    numBlock = numBlocks || 6;
    blockFunc = blockFunc || (function() {
        return document.createTextNode('');
    });
    var mx = 0,
        my = 0;

    var friction = 0.02;
    var el = document.body;
    var mouseBlock = new Block(200, 200); //follows the mouse
    el.appendChild(mouseBlock.el);
    var blocks = [];
    _.times(numBlocks, (i) => {
        var b = new Block(200, 200);
        b.el.appendChild(blockFunc(i));
        blocks.push(b);
        el.appendChild(b.el);
    });

    window.addEventListener('mousemove', (evt) => {
        mx = evt.clientX;
        my = evt.clientY;
    });

    function Block(xInitial, yInitial) {
        var el = document.createElement('div');
        el.setAttribute('class', 'doge-block');
        el.style.position = 'absolute';

        this.friction = 1;

        this.mass = 1;

        this.x = xInitial,
        this.y = yInitial;

        this.vx = 0,
        this.vy = 0;

        this.ax = 0;
        this.ay = 0;

        this.animate = function(t) {
            // this.vx += this.ax / this.mass;
            // this.vy += this.ay / this.mass;

            this.x += this.vx;
            this.y += this.vy;
            
            el.style.left = (this.x - 10) + 'px';
            el.style.top = (this.y - 10) + 'px';
        };

        this.el = el;
    }

    requestAnimationFrame(animate);

    function animate(t) {
        requestAnimationFrame(animate);

        // Mouse block follows the mouse
        mouseBlock.x = mx;
        mouseBlock.y = my;
        var friction = 0.88;
        blocks.reduce((prevBlock, block) => { // Each block follows the previous, starting from the mouseBlock
            block.vx += (prevBlock.x - block.x) * friction;
            block.vy += (prevBlock.y - block.y) * friction;
            block.animate(t);
            return block;
        }, mouseBlock);

        mouseBlock.animate(t);
    }
}