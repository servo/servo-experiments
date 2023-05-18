window.onload = function() {
	var classes = [ 'translate', 'translate-x', 'translate-y', 'translate-z', 'translate-3d', 'rotate', 'rotate-x', 'rotate-y', 'rotate-z', 'skew', 'skew-x', 'skew-y', 'scale', 'scale-x', 'scale-y', 'scale-3d', 'perspective', 'matrix' ];
	var container = document.getElementById('container');
	createClassTogglingDivs(container, classes);
};
