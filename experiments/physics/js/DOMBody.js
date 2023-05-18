// DOMBody - represents the pairing of a Physics DOM element with a p2 js body
function DOMBody(physicsEl, body) {
    this.el = physicsEl.el;
    this.body = body;
    this.pos = physicsEl.pos;
    this.rot = physicsEl.rot;
    this.width = physicsEl.width;
    this.ready = physicsEl.ready; // Promise representing when this is ready to be added
    this.hide = physicsEl.hide;
    this.show = physicsEl.show;
}