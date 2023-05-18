function createClassTogglingDivs(container, classes) {
	var elementFactories = [
		{ title: 'div', func: getDiv },
		{ title: 'iframe', func: getIframe }
	];
	var delayInc = 200;
	var interval = 2000;
	
	elementFactories.forEach((factory) => {
		var section = getSection(factory.title);
		container.appendChild(section);

		for(var i = 0; i < classes.length; i++) {
			var c = classes[i];

			var wrapper = makeWrapper(c);
			var el = factory.func();

			wrapper.appendChild(el);
			section.appendChild(wrapper);

			el.classList.add('transitions');

			scheduleToggling(el, c, i * delayInc, interval);
		}
	});

	function scheduleToggling(el, c, delay, interval) {
		setTimeout(function() {
			setInterval(function() {
				el.classList.toggle(c);
			}, interval);
		}, delay);
	}

	function makeWrapper(title) {
		var el = document.createElement('div');
		el.className = 'wrapper';

		var header = document.createElement('h3');
		header.innerHTML = title;

		el.appendChild(header);

		return el;
	}

	function getSection(title) {
		var section = document.createElement('section');
		var header = document.createElement('h2');
		header.innerHTML = 'Transforming <tt>' + title + '</tt>s';
		section.appendChild(header);

		return section;
	}

	function getDiv() {
		var el = document.createElement('div');
		var img = document.createElement('img');
		img.src = '../../images/servo.png';
		el.appendChild(img);
		return el;
	}

	function getIframe() {
		var el = document.createElement('iframe');
		el.src = 'iframe.html';
		return el;
	}
}