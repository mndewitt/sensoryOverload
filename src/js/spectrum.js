(function() {

	var spectrum = {
		init: function() {
			window.onload = spectrum.addListeners();
		},

		addListeners: function(){
			var ctx = new AudioContext(),
				dragger = document.getElementById('dragger'),
				osc;

    		dragger.addEventListener('mousedown', function mouseDown(e) {

	  			window.addEventListener('mousemove', spectrum.mover, true);

	  			osc = ctx.createOscillator();
				osc.type = 'sine';
				osc.frequency.value = e.pageY;
				osc.connect(ctx.destination);
				osc.start();

	  			spectrum.getMouseCoords(e, osc);

    		}, false);


    		window.addEventListener('mouseup', function mouseUp(e) {

    			dragger.onmousemove = null;
    			osc.stop();
    			window.removeEventListener('mousemove', spectrum.mover, true);

    		}, false);
		},

		mover: function(e){
    		var dragger = document.getElementById('dragger');
  			dragger.style.position = 'absolute';
  			dragger.style.top = e.clientY - 15 + 'px';
  			dragger.style.left = e.clientX - 15 + 'px';
		},

		getMouseCoords: function(e, osc) {
			var dragger = document.getElementById('dragger');

			dragger.onmousemove = mouseMoveTrigger;

			function mouseMoveTrigger(e) {
				osc.frequency.value = e.pageY;
			}
		}
	}

	spectrum.init();

})();

