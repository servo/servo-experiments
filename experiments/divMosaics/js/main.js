window.addEventListener('load', init);

function init() {
	var demo = new Demo({
    	resolution: 20, // Resolution is the width and height of each mosaic tile - the smaller this value, the more demanding the operation
    	images: ['images/banksy1.jpg', 'images/banksy2.jpg', // List of images that can be selected to be mosaic-ified
             'images/bars.jpg', 
             'images/servo-doge.png',
             'images/firefox.png',
             'images/chrome.jpg',
             'images/sunset.jpg',
             'images/sunset3.jpeg'
             ]
	});

	var demoContainer = document.getElementById('demo');
	demoContainer.appendChild(demo.dom);
};
