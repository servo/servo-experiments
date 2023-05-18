window.addEventListener('load', function() {
	var w = new Widget(() => {
		var cd = new CanvasDisplay();
		var ctx = cd.el.getContext('2d');
		ctx.fillStyle = '#5169b3';
		ctx.fillRect(0, 0, cd.el.width, cd.el.height);
		return cd.el;
	});

	var demo = document.getElementById('demo');
	var n = 32;
	_.times(n, function() {
		demo.appendChild(new RandomWidget().el);
	});

	// demo.appendChild(new FireWidget().el);

	requestAnimationFrame(update);

	function update(t) {
		requestAnimationFrame(update);
		TWEEN.update(t);
	}
});