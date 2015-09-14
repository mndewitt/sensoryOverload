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

			//And let's run the radar circle method
			voicemonitor.drawRadarCircle();
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
			canvasCtx.arc(300, 150, radius, 0, 2*Math.PI);
			canvasCtx.closePath();
			canvasCtx.fillStyle = '#66D9EF';
			canvasCtx.fill();
		},

		drawRadarCircle: function() {
			var mainCanvas = document.getElementById('radar-circle'),
				canvasCtx = mainCanvas.getContext('2d'),
				canvasWidth = mainCanvas.width,
				canvasHeight = mainCanvas.height,
				i = 0;

			function drawRadar(radius) {
				canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
				canvasCtx.beginPath();
				canvasCtx.arc(300, 150, radius, 0, 2*Math.PI);
				canvasCtx.lineWidth = 1;
				canvasCtx.closePath();
				canvasCtx.strokeStyle = '#66D9EF';
				canvasCtx.stroke();
			}

			setInterval(function() {

				/* Draw an ever increasing circle for the 
				first 150 iterations.  Then, let it continue
				to run after deleting the circle to create a pause.
				Finally, reset the whole thing back to 0. */

				if(i < 150) {
					drawRadar(i);
				} else if(i === 150) {
					canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
				} else if(i === 400) {
					i = 0;
				}

				i++;
				
			}, 5);
		}
	}

	voicemonitor.init();

})();