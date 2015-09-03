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
				oscType = document.getElementById('osc-type-select'),
				isAlreadyPlaying = false,
				noteArrayIndex = 0,
				osc;

			//Various click events to control oscillator
			start.onclick = function() {

				//Prevent multiple oscillators from playing
				if(isAlreadyPlaying === true) {
					return;
				}

				//We need to initiate a new oscillator ever time we start
				osc = ctx.createOscillator();
				osc.type = oscType.options[oscType.selectedIndex].value;
				osc.frequency.value = freq;
				osc.connect(ctx.destination);
				osc.start();
				isAlreadyPlaying = true;
				drone.bindCurrentNote(noteArrayIndex);
			}

			stop.onclick = function() {
				osc.stop();
				isAlreadyPlaying = false;
				drone.bindCurrentNote(false);
			}

			up.onclick = function() {
				if(isAlreadyPlaying !== true) {
					return;
				}

				freq = freq * 1.0595;
				osc.frequency.value = freq;

				if(noteArrayIndex === 11) {
					noteArrayIndex = 0;
				} else {
					noteArrayIndex++;
				}


				drone.bindCurrentNote(noteArrayIndex);
			}

			down.onclick = function() {
				if(isAlreadyPlaying !== true) {
					return;
				}

				freq = freq / 1.0595;
				osc.frequency.value = freq;

				if(noteArrayIndex === 0) {
					noteArrayIndex = 11;
				} else {
					noteArrayIndex--;
				}

				drone.bindCurrentNote(noteArrayIndex);
			}

			oscType.onchange = function() {
				osc.type = oscType.options[oscType.selectedIndex].value;
			}
		},

		bindCurrentNote: function(noteArrayIndex) {
			var noteArray = ['A', 'Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'],
				noteNameEl = document.getElementById('note-name');
			
			if(noteArrayIndex === false) {
				noteNameEl.innerHTML = '';
			} else {
				noteNameEl.innerHTML = noteArray[noteArrayIndex];
			}
		}
	}


	drone.init();
})();