 // Physics IFrame
 function PIFrame(stage, src, x, y, width, height, cb) {
        var el = document.createElement('iframe');
        el.src = src;
        el.className = 'PIFrame';

        el.style.width = width + 'px';
        el.style.height = height + 'px';
        
        var pos = {x: x, y: y};
        var rot = 0;

        setPos(x, y);

        var hsw = stage.width / 2;
        var hsh = stage.height  / 2; 

        function setPos(x, y) {
            if (x) {
                pos.x = x;
            }

            if (y) {
                pos.y = y;
            }

            updatePos();

            return pos;
        }

        function setRot(rad) {
            rot = rad;
            updateRot();
        }

        function updatePos() {
            // Draw element as if (0, 0) is the origin of the stage and the elements coordinates are measured from it's centre
            var modifiedX = hsw + (pos.x - (width / 2));
            var modifiedY = hsh - (pos.y + (height / 2));
            // el.style.transform = 'translate(' + modifiedX + 'px, ' + modifiedY + 'px)';
            el.style.left = modifiedX + 'px';
            el.style.top = modifiedY + 'px';
        }

        function updateRot() {
            if (PIFrame.ROT_ENABLED) {
                el.style.transform = 'rotate(' + (rot * -1) + 'rad)';
            }
        }

        this.pos = setPos;

        this.rot = setRot;

        this.width = function(w) {
            el.style.width = w + 'px';
        };

        this.hide = function() {
            el.className = 'PIFrame hidden';
        };

        this.show = function() {
            el.className = 'PIFrame';
        };

        this.ready = new Promise((resolve, reject) => {
            el.onload = resolve;
        });

        this.el = el;
}

PIFrame.ROT_ENABLED = true;