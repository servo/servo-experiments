// skew, rotate X Y Z, translate X Y Z

window.onload = function() {
	var classes = [ 'blur', 'brightness', 'contrast', 'drop-shadow', 'grayscale', 'hue-rotate', 'invert', 'opacity', 'saturate', 'sepia'];
	var container = document.getElementById('container');
	createClassTogglingDivs(container, classes);
};