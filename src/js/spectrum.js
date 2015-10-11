(function() {

	var spectrum = {
		init: function() {
			window.onload = spectrum.addListeners();
		},

		addListeners: function(){
    		document.getElementById('dragger').addEventListener('mousedown', spectrum.mouseDown, false);
    		window.addEventListener('mouseup', spectrum.mouseUp, false);
		},

		mouseDown: function(e){
  			window.addEventListener('mousemove', spectrum.mover, true);
  			spectrum.getMouseCoords(e);
		},

		mouseUp: function(e) {
			document.getElementById('dragger').onmousemove = null;
    		window.removeEventListener('mousemove', spectrum.mover, true);
		},

		mover: function(e){
    		var dragger = document.getElementById('dragger');
  			dragger.style.position = 'absolute';
  			dragger.style.top = e.clientY - 15 + 'px';
  			dragger.style.left = e.clientX - 15 + 'px';
		},

		getMouseCoords: function(e, stopSound) {
			var dragger = document.getElementById('dragger');

			dragger.onmousemove = mouseMoveTrigger;

			function mouseMoveTrigger(e) {

				var coords = {
					x: e.pageX,
					y: e.pageY
				}

				console.log(coords);
			}
		}
	}

	spectrum.init();

})();

