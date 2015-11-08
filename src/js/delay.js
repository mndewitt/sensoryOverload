(function() {

	var DRAGGED_ELEMENT = document.getElementById('dragger');

	var feedbackAndDelays = {
		init: function() {
			window.onload = feedbackAndDelays.setupAudioFiltersAndEvents();
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

			feedbackAndDelays.addDraggerEventListeners(ctx, delay);
			feedbackAndDelays.updateFeedbackSlider(feedback);
			feedbackAndDelays.updateDelaySlider(delay);

		},

		addDraggerEventListeners: function(ctx, delayObj) {

			DRAGGED_ELEMENT.addEventListener('mousedown', function mouseDown(e) {

				window.addEventListener('mousemove', feedbackAndDelays.setDraggerPosition, true);

				osc = ctx.createOscillator();
				osc.type = 'sine';
				osc.frequency.value = e.pageY;
				osc.connect(delayObj);
				osc.connect(ctx.destination);
				osc.start();

				feedbackAndDelays.updateFrequency(e, osc);

			}, false);

			DRAGGED_ELEMENT.addEventListener('mouseup', function mouseUp(e) {

				DRAGGED_ELEMENT.onmousemove = null;
				osc.stop();
				window.removeEventListener('mousemove', feedbackAndDelays.setDraggerPosition, true);

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

	feedbackAndDelays.init();

})();

