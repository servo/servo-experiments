// fireCanvas - given a canvas and number of particles, animates a fire effect on the canvas
var fireCanvas = function(c, numParticles) {

    function Random(range) {
        return Math.floor((Math.random() * range) + 1);
    }
    function RandomFloat(range) {
        return (Math.random() * range) + 1;
    }

    function Viewport() {
        var me = this;
        me.objects = [];
        var canvas = c;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.onresize = function() {
            resizeCanvas();
        }
        var drawingSurface = canvas.getContext('2d');
        me.doPaint = true;

        function drawBackgroundImage() {
            drawingSurface.globalAlpha = 1;
            drawingSurface.fillStyle = 'black';
            drawingSurface.fillRect(0, 0, canvas.width, canvas.height);
        }

        function drawObjects() {
            for (var i = 0; i < me.objects.length; i++) {
                me.objects[i].paint(drawingSurface);
            }
        }
        me.paintInit = function() {
            me.doPaint = true;
        }

        function paint() {
            me.paintInit();
            if (me.doPaint) {
                drawBackgroundImage();
                drawObjects();
                me.doPaint = false;
            }
        }
        var timer;
        me.init = function() {
            timer = setInterval(function() {
                paint();
            }, 1000 / 30);
        };
        me.repaint = function() {
            me.doPaint = true;
        };
        me.addObject = function(obj) {
            me.objects.push(obj);
        }
    }

    function Particle() {
        var me = this;
        var source = {};
        source.location = {
            x: window.innerWidth / 2,
            y: (window.innerHeight / 2) + 100
        };
        me.reset = function() {
            me.wind = 0;
            me.speed = RandomFloat(5) - 10;
            me.radius = 20;
            me.opacity = 255;
            me.greenFactor = 255;
            me.color = 'rgb(255,255,0)';
            me.location = {
                x: source.location.x + Random(40),
                y: source.location.y
            };
        };
        me.reset();
        me.move = function() {
            if (me.location.y < source.location.y - 300 || me.radius <= 1) {
                me.reset();
            }
            me.radius += 20 / (300 / me.speed);
            me.opacity += 255 / (300 / me.speed);
            me.greenFactor += 255 / ((300 * 2) / me.speed);
            me.color = "rgb(255," + (Math.floor(me.greenFactor) + 1) + ",0)";
            me.location.x += me.wind;
            me.location.y += me.speed;
        };
        me.paint = function(context) {
            me.move();
            context.beginPath();
            context.arc(me.location.x, me.location.y, me.radius, 0, 2 * Math.PI, false);
            context.fillStyle = me.color;
            context.globalAlpha = me.opacity / 255;
            context.fill();
            context.closePath();
        };
    }

      var viewport = new Viewport();
      for (var i = 0; i < numParticles; i++) {
          viewport.addObject(new Particle());
      }
      viewport.init();

};
