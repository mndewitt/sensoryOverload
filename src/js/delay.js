(function() {

	var DRAGGED_ELEMENT = document.getElementById('dragger');

	var spectrum = {
		init: function() {
			window.onload = spectrum.setupAudioFiltersAndEvents();
		},

		setupAudioFiltersAndEvents: function(){
			var ctx = new AudioContext(),
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

			spectrum.addDraggerEventListeners(ctx, delay);
			spectrum.updateFeedbackSlider(feedback);
			spectrum.updateDelaySlider(delay);

		},

		addDraggerEventListeners: function(ctx, delayObj) {

			DRAGGED_ELEMENT.addEventListener('mousedown', function mouseDown(e) {

				window.addEventListener('mousemove', spectrum.setDraggerPosition, true);

				osc = ctx.createOscillator();
				osc.type = 'sine';
				osc.frequency.value = e.pageY;
				osc.connect(delayObj);
				osc.connect(ctx.destination);
				osc.start();

				spectrum.updateFrequency(e, osc);

			}, false);

			DRAGGED_ELEMENT.addEventListener('mouseup', function mouseUp(e) {

				DRAGGED_ELEMENT.onmousemove = null;
				osc.stop();
				window.removeEventListener('mousemove', spectrum.setDraggerPosition, true);

			}, false);

		},

		updateFeedbackSlider: function(feedbackObj) {
			var feedbackSlider = document.getElementById('feedback-slider');

			feedbackSlider.onchange = function feedbackSliderChange() {
				feedbackObj.gain.value = feedbackSlider.value / 100;
			}
		},

		updateDelaySlider: function(delayObj) {
			var delaySlider = document.getElementById('delay-slider');

			delaySlider.onchange = function delaySliderChange() {
				delayObj.delayTime.value = delaySlider.value / 100;
			}
		},

		setDraggerPosition: function(e){
			DRAGGED_ELEMENT.style.position = 'absolute';
			DRAGGED_ELEMENT.style.top = e.clientY - 15 + 'px';
			DRAGGED_ELEMENT.style.left = e.clientX - 15 + 'px';
		},

		updateFrequency: function(e, osc) {
			DRAGGED_ELEMENT.onmousemove = updateOscillator;

			function updateOscillator(e) {
				osc.frequency.value = e.pageY;
			}
		}
	}

	spectrum.init();

})();

