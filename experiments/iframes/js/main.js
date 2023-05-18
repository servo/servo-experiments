window.addEventListener('load', init);

function init() {

	var stats = new ServoStats();
	document.body.appendChild(stats.dom);

	var demo = new Demo();
	var demoContainer = document.getElementById('demo');
	demoContainer.appendChild(demo.dom);

	requestAnimationFrame(animate);

	function animate(t) {

		requestAnimationFrame(animate);

		stats.start();
	
		demo.animate(t);
		
		stats.end();
		stats.update();
	}
};
