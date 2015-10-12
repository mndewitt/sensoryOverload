(function() {

	var spectrum = {
		init: function() {
			window.onload = spectrum.addListeners();
		},

		addListeners: function(){
			var ctx = new AudioContext(),
				dragger = document.getElementById('dragger'),
				feedbackSlider = document.getElementById('feedback-slider'),
				delaySlider = document.getElementById('delay-slider'),
				delay = ctx.createDelay(),
				feedback = ctx.createGain(),
				filter = ctx.createBiquadFilter(),
				osc;

			delay.delayTime.value = 0.4;
			feedback.gain.value = 0.4;
			filter.frequency.value = 4000;

			filter.connect(delay);
			delay.connect(feedback);
			feedback.connect(filter);
			delay.connect(ctx.destination);

			dragger.addEventListener('mousedown', function mouseDown(e) {

				window.addEventListener('mousemove', spectrum.mover, true);

				osc = ctx.createOscillator();
				osc.type = 'sawtooth';
				osc.frequency.value = e.pageY;
				osc.connect(delay);
				osc.connect(ctx.destination);
				osc.start();

				spectrum.getMouseCoords(e, osc);

			}, false);

			dragger.addEventListener('mouseup', function mouseUp(e) {

				dragger.onmousemove = null;
				osc.stop();
				window.removeEventListener('mousemove', spectrum.mover, true);

			}, false);

			feedbackSlider.onchange = function feedbackSliderChange() {
				feedback.gain.value = feedbackSlider.value / 100;
			}

			delaySlider.onchange = function delaySliderChange() {
				delay.delayTime.value = delaySlider.value / 100;
			}
		},

		mover: function(e){
			var dragger = document.getElementById('dragger');
			dragger.style.position = 'absolute';
			dragger.style.top = e.clientY - 15 + 'px';
			dragger.style.left = e.clientX - 15 + 'px';
		},

		//TODO: rename
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

