var Widget = (function() {
    var selectedWidget = null;

    return function (childDOM) {
        var self = this;
        var el = document.createElement('article');
        el.className = 'widget col-1-8';
        el.appendChild(childDOM());

        var active = false;

        var collapsedSize = {
            w: 12.5, // in %
            h: 200 // in px
        };
        var expandedSize = {
            w: 25, // in %
            h: 600 // in px
        };
        var size = _.clone(collapsedSize); // Represents current size;

        el.addEventListener('click', function() {
            if (selectedWidget === self) {
                return toggle();
            }

            if (selectedWidget) {
                selectedWidget.toggle();
            }

            toggle();
            selectedWidget = self;
        });
        
        function collapse() {
            new TWEEN.Tween(size)
                .to(collapsedSize, 200)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .onUpdate(() => {
                    el.style.width = size.w + '%';
                    el.style.height = size.h + 'px';
                })
                .start();
        }

        function expand() {
            new TWEEN.Tween(size)
                .to(expandedSize, 200)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .onUpdate(() => {
                    el.style.width = size.w + '%';
                    el.style.height = size.h + 'px';
                })
                .start();
        }

        function toggle() {
            if (active) {
                collapse();
            } else {
                expand();
            }

            active = !active;
        }

        this.el = el;
        this.collapse = collapse;
        this.expand = expand;
        this.toggle = toggle;
    }

})();


var CatGifWidget = (function () {
    var uid = 0;
    return function() {
        return new Widget(() => new GifCanvas(catGifURL()).el); // For Canvas Rendered Gif
        // return new ImgWidget('http://thecatapi.com/api/images/get?format=src&type=gif&f=' + (Date.now() + (uid++)));
    }
})();

var CatImgWidget = (function () {
    var uid = 0;
    return function() {
        return new ImgWidget(catImgURL());
    }
})();

var IFrameWidget = function (src) {
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.onerror = function() {
        console.log('error!');
    };
    return new Widget(() => iframe);
};

var WikiWidget = function () {
    return new IFrameWidget('http://en.wikipedia.org/wiki/Special:Random');
}

var LipsumWidget = function () {
    return new Widget(() => {
        var div = document.createElement('p');
        div.textContent = lipsum() + lipsum();
        return div;
    });
}

var FireWidget = function () {
    var cw = new CanvasDisplay();
    fireCanvas(cw.c, 200);
    return new Widget(() => cw.el);
}

var RandomWidget = function () {
    var widgetPool = [CatImgWidget]; // Alternatives: CatGifWidget, FireWidget, LipsumWidget
    return new _.sample(widgetPool)();
};

var ImgWidget = function (src) {
    return new Widget(() => {
        var img = document.createElement('img');
        img.src = src;      
        return img;
    });
};

var CanvasWidget = function (effect) {
    var cd = new CanvasDisplay();
    cd.start();

    return new Widget(() => cd.el);
};

function lipsum() {
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium metus metus, nec consequat enim ultrices sed. Nullam tempor tortor sed urna pulvinar semper. Pellentesque volutpat maximus felis. Aenean ullamcorper nunc vel euismod cursus. Vestibulum dapibus lorem ut porttitor rhoncus. Vestibulum mollis malesuada purus eget rutrum. Nunc tellus libero, ultricies eget aliquet ut, tristique eget nibh. Duis ut pellentesque mi. Morbi volutpat viverra fermentum. Phasellus ut tortor sed velit auctor consequat. Suspendisse maximus volutpat dui, vel fermentum elit gravida id. Quisque mollis vitae diam sed blandit. Etiam accumsan tortor vel augue pellentesque, a luctus lectus viverra. Mauris euismod viverra enim nec rutrum. Suspendisse posuere tortor metus, vel convallis nunc egestas nec. ';
}

var catImgURL = (function() {
    var uid = 0;

    return function() {
        return 'http://thecatapi.com/api/images/get?format=src&type=png&f=' + (uid++);
    };
})();

var catGifURL = (function() {
    var uid = 0;

    return function() {
        return 'http://thecatapi.com/api/images/get?format=src&type=gif&f=' + uid;
    };
})();