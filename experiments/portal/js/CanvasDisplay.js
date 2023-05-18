function CanvasDisplay(render) {
	var cv = document.createElement('canvas');

	this.render = render;
	this.el = cv;
	this.c = cv;
}
CanvasDisplay.prototype.render = () => {};
CanvasDisplay.prototype.start = function() {
	requestAnimationFrame(animate);

	function animate() {
		requestAnimationFrame(animate);

		this.render();
	}
};