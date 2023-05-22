window.onload = function() {
	//Setup FPS graph
	var graph = new LiveGraph(document.getElementById('fpsGraph'), {
		minY: 0,
		maxY: 90,
		width: 200,
		height: 60,
		label: 'FPS',
	});
	var graphSkipCount = 1; // Used so we don't plot on the graph every single frame
	var graphPlotFrequency = 1; // Plot every 20 frames

	var imageURL = 'servo-doge.png';
	var imageWidth = 512;
	var imageHeight = 512;
	var imageCounter = 0;

	var counterElement = document.querySelector('h1');
	var container = document.getElementById('container');

	var stats = new ServoStats();
	stats.onUpdate(function(fps) {
		if (graphSkipCount % graphPlotFrequency !== 0) {
			graphSkipCount++;
			return;
		}

		graphSkipCount = 1;
		graph.timePlot(fps);
	})

	container.appendChild(stats.dom);
	
	animate();

	addImage();

	function animate() {
		stats.start();

		requestAnimationFrame(animate);
		
		stats.end();
		stats.update();
	}

	function addImage() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		var img = document.createElement('img');
		img.src = imageURL;

		container.appendChild(img);

		var originX = Math.random() > 0.5 ? random(-w) : random(w);
		var originY = Math.random() > 0.5 ? random(-h) : random(h);
		var sign = Math.random() > 0.5 ? -1 : 1;
		
		setTransform(img, 0.01, 0.01, random(360 * 2) * sign);
		setPosition(img, originX, originY);

		setTimeout(function() {
			setTransform(img, 1, 1, 0);
			setPosition(img, random(w - imageWidth), random(h - imageHeight));
		}, 500);

		imageCounter++;

		counterElement.innerHTML = imageCounter;

		setTimeout(addImage, 125);
	}

	function random(maxValue) {
		return Math.round(Math.random() * maxValue);
	}

	function setPosition(element, x, y) {
		element.style.left = x + 'px';
		element.style.top = y + 'px';
	}

	function setTransform(element, sx, sy, deg) {
		element.style.transform = 'rotate(' + deg + 'deg) scale(' + sx + ', ' + sy + ')';
	}
};
