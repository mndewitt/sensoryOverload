(function() {

	var drone = {
		init: function() {
			drone.playNote();
		},

		playNote: function() {
			var ctx = new AudioContext(),
				freq = 220,
				start = document.getElementById('startsound'),
				stop = document.getElementById('stopsound'),
				up = document.getElementById('pitchup'),
				down = document.getElementById('pitchdown'),
				osc;

			//Various click events to control oscillator
			start.onclick = function() {
				//We need to initiate a new oscillator ever time we start
				osc = ctx.createOscillator();
				osc.type = 'sine';
				osc.frequency.value = freq;
				osc.connect(ctx.destination);
				osc.start();
			}

			stop.onclick = function() {
				osc.stop();
			}

			up.onclick = function() {
				freq = freq * 1.0595;
				osc.frequency.value = freq;
			}

			down.onclick = function() {
				freq = freq / 1.0595;
				osc.frequency.value = freq;
			}
		}
	}


	drone.init();
})();