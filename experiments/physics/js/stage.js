// Stage for a p2.js simulation. Uses given DOM Element
function Stage(el, world) {
    var w = document.body.clientWidth,
        h = document.body.clientHeight;

    var domBodies = []; // List of all DOM Physics Bodies to be rendered

    return {
        width: w,
        height: h,
        left: -(w / 2),
        right: (w / 2),
        top: (h / 2),
        bottom: -(h /2),
        addDOMBody: function(domBody) {
            // Only add domBody once the ready promise has been resolved
            el.appendChild(domBody.el);
            domBody.ready.then(() => {
                domBody.show();
                world.addBody(domBody.body);
                domBodies.push(domBody);
            });
        },
        domBodies: () => domBodies
    };
}
