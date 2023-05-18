(function(src, createReplacementEl) {
    if (window._nastify) { return;}
    window._nastify = true;

    var DEFAULT_AD_WIDTH = 500,
        DEFAULT_AD_HEIGHT = 60;

    var MIN_LOAD_DELAY = 300,
        MAX_LOAD_DELAY = 2500;

    window.addEventListener('load', function() {
        Array.from(document.scripts)
            .filter((script) => {
                return script.getAttribute('src') === src;
            })
            .map((script) => {
                var ad = createReplacementEl(script);
                ad.style.display = 'none';
                script.parentNode.replaceChild(ad, script);

                setTimeout(() => {
                    ad.style.display = 'block';
                }, random(MIN_LOAD_DELAY, MAX_LOAD_DELAY));
             });
    });
})('../../js/nastyProvider.js' , getRandomDivAd);


function getRandomDivAd(script) {
    var el = document.createElement('div');
    var width = script.getAttribute('data-ad-width'),
        height = script.getAttribute('data-ad-height');

    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.style.display = 'block';
    el.style.textAlign = 'center';
    el.classList.add('remove');
    var sp = document.createElement('div');
    sp.style.color = 'red';
    sp.style.transition = '0.5s background-color ease-in-out';
    sp.style.padding = '2px';
    sp.style.width = '100%';
    sp.style.height = '100%';
    var inner = document.createElement('span');
    inner.innerHTML = '<h3>' + (Math.random() > 0.5 ? 'BUY ONE DOGE GET ONE FREE' : 'YOU ARE THE 10th VISITOR TO THIS SITE - CLAIM YOUR FREE DOGE NOW') + '</h3>';
    inner.style.zIndex = 50;
    inner.style.transform = 'rotate(0deg)';
    sp.style.fontFamily = 'arial';

    setTimeout(flashBackground, (Math.random() * 2000) + 1000);
    function flashBackground() {
        sp.style.backgroundColor = '#' + Math.round((Math.random() * 0xFF0000)).toString(16);
        setTimeout(flashBackground, (Math.random() * 1500) + 500);
    } 
    el.appendChild(sp);

    var numDoges = 3;
    var dogeDelay = (Math.random() * 4000) + 1000;
    for (var i = 0; i < numDoges; i++) {
        var img = new Image();
        img.src = '../images/servo.png';
        img.width = 64;
        img.height = 64;
        img.style.transition = '2s transform ease-in-out';

    }
    sp.appendChild(inner);
    el.style.cursor = 'pointer';

    return el;   
}

function getRandomIFrameAd(script) {
    var ads = ['../../js/nasty/monkeys/physics/monkeys.html'];
    var width = script.getAttribute('data-ad-width') || DEFAULT_AD_WIDTH,
        height = script.getAttribute('data-ad-height') || DEFAULT_AD_HEIGHT;

    var ad = document.createElement('iframe');
    ad.width = width;
    ad.height = height;

    ad.style.border = '1px solid black';
    ad.style.display = 'none';

    ad.src = randomSrc();

    function randomSrc() {
        var index = random(0, ads.length - 1);
        return ads[index];
    }

    return ad;
}

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};
