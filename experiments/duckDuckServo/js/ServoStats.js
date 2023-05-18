function ServoStats() {

	var getNow = makeGetNowFunction();
	var startTime = getNow();
	var lastTime = startTime;
	var frames = 0;
	var ms = 0;
	var fps = 0;

	var el = document.createElement('div');
	el.className = 'servo-stats';
	//el.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000;background:#f00;color:#fff;';
	var fpsEl = document.createElement('span');
	var msEl = document.createElement('span');
	var ul = document.createElement('ul');
	[['fps', fpsEl], ['ms', msEl]].forEach((pair) => {
		var title = document.createElement('span');
		title.innerHTML = pair[0] + ': ';
		
		var li = document.createElement('li');
		ul.appendChild(li);
		li.appendChild(title);
		li.appendChild(pair[1]);
	});
	el.appendChild(ul);

	this.dom = el;
	
	this.start = function() {
		startTime = getNow();
	};

	this.end = function() {
		frames++;
		var now = getNow();
		
		ms = now - startTime;

		if(now > lastTime + 1000) {
			fps = (frames * 1000) / (now - lastTime);
			lastTime = now;
			frames = 0;
		}

		return now;
	};

	this.update = function() {
		fpsEl.innerHTML = Math.round(fps);
		msEl.innerHTML = Math.round(ms);
	};


	function makeGetNowFunction() {
		var timerObject = performance || Date;
		return function() {
			return timerObject.now();
		}
	}

}
