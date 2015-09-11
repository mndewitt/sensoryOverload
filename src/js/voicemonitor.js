(function() {

	var voicemonitor = {
		init: function() {
			voicemonitor.getMicrophoneAudio();
		},

		getMicrophoneAudio: function() {
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			navigator.getUserMedia(
				{
					"audio": {
						"mandatory": {
							"googEchoCancellation": "false",
							"googAutoGainControl": "false",
							"googNoiseSuppression": "false",
							"googHighpassFilter": "false"
						},
						"optional": []
					},
				}, voicemonitor.analyzeAudio, function(e) {
					alert('Error getting audio');
					console.log(e);
				}
			);
		},

		analyzeAudio: function(stream) {
			var ctx = new AudioContext(),
				audioSrc = ctx.createMediaStreamSource(stream),
				analyser = ctx.createAnalyser(),
				frequencyData = new Uint8Array(analyser.frequencyBinCount);

			audioSrc.connect(analyser);
			audioSrc.connect(ctx.destination);

			function renderFrame() {
				requestAnimationFrame(renderFrame);
				analyser.getByteFrequencyData(frequencyData);
				voicemonitor.drawCircle(voicemonitor.getAverageFrequencies(frequencyData));
			}

			renderFrame();
		},

		getAverageFrequencies: function(freqArray) {
			var values = 0,
				length = freqArray.length,
				average

			for (var i = 0; i < length; i++) {
				values += freqArray[i];
			}

			average = values / length;
			
			return average;
		},

		drawCircle: function(radius) {
			var mainCanvas = document.getElementById('circle'),
				canvasCtx = mainCanvas.getContext('2d'),
				canvasWidth = mainCanvas.width;
				canvasHeight = mainCanvas.height;

			canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
			canvasCtx.beginPath();
			canvasCtx.arc(100, 50, radius, 0, 2*Math.PI);
			canvasCtx.closePath();
			canvasCtx.fillStyle = "#66D9EF";
			canvasCtx.fill();
		}
	}

	voicemonitor.init();

})();