function Demo() {

    var listener = new window.keypress.Listener();

    var iframes;
    var el = document.createElement('div');

    var randWikiURL = 'https://en.wikipedia.org/wiki/Special:Random';
    var views = {
        top: new View(View.TOP, 'https://en.wikipedia.org/wiki/JavaScript'),
        bottom:  new View(View.BOTTOM, 'https://en.wikipedia.org/wiki/Python')
    };

    views.top.setOpposite(views.bottom);
    views.bottom.setOpposite(views.top);

    _.values(views).forEach((v) => {el.appendChild(v.el)});
  
    var vm = new ViewManager(views);
    
    var cb = new ControlBar();
    el.appendChild(cb.el);


    cb.addEventListener('query', function (evt) {
        var query = evt.detail.query;
        vm.setSrc('https://en.wikipedia.org/wiki/' + query);
    });

    listener.simple_combo('shift space', function() {
        cb.toggle();
    });

    listener.simple_combo('esc', function() {
        if (cb.isActive()) {
            cb.toggle();
        }
    });

    window.addEventListener('keydown', onNumberKeyPress((n) => {
        vm.sizeChange((n === '0') ? 100 : (n * 10));
    }));

/*    var urls = [
        'https://en.wikipedia.org/wiki/Mozilla',
        'https://en.wikipedia.org/wiki/Servo_(layout_engine)',
        'https://en.wikipedia.org/wiki/Rust_(programming_language)',
        'https://en.wikipedia.org/wiki/Compiler'
    ];*/

   /* _.times(50, function() {
        // urls.push('https://en.wikipedia.org/wiki/Special:Random');
    });

    urls = [];
    iframes = urls.map((url) => {
        return new DemoIFrame(url);
    });

    var dummyIFrame = new DemoIFrame();
    var selected = dummyIFrame; // Dummy IFrame

    iframes.forEach((iframe) => {
        el.appendChild(iframe.el);
    });

    window.addEventListener('keydown', onNumberKeyPress(_.partial(setSelected)));

    var curr = 1;
  
    function setSelected(n) {
        if (iframes[n - 1] === selected || !iframes[n -1]) { 
            // Collapse if already elected
            // selected.collapse().start();
            // selected = dummyIFrame;
            return;
        }

        var collapse = selected.collapse().start();
        selected = iframes[n - 1];
        var expand = selected.expand().start()

    }
*/
    this.animate = function(t) {
        TWEEN.update(t);
        
        // Animate all IFrames
        //iframes.forEach((iframe) => {iframe.animate(t);});
        // Animate container
        // el.style.transform = 'rotateX(' + props.rotY + 'deg)';
    };

    this.dom = el;
}
