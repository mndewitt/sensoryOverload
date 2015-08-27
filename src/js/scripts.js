(function() {

	//Const for the number of nodes to be created/manipulated
	var NUMBER_OF_NODES = 200;

	var freqVisualizer = {
		init: function() {
			//Set the parent node container
			var nodeContainer = document.getElementById('freq-node-container');
			
			//First, let's create the nodes we need dynamically
			freqVisualizer.createNodes(nodeContainer);

			//Then, run the visualizer
			freqVisualizer.visualizer();
		},

		createNodes: function(parentEl) {
			for(var i = 1; i<= NUMBER_OF_NODES; i++) {
				var nodeChild = document.createElement('div'),
					id = 'freq-node' + i;

				nodeChild.setAttribute('class', 'freq-node');
				nodeChild.setAttribute('id', id);
				parentEl.appendChild(nodeChild);
			}
		},

		visualizer: function() {
			var ctx = new AudioContext(),
				audio = document.getElementById('track'),
				audioSrc = ctx.createMediaElementSource(audio),
				analyser = ctx.createAnalyser(),
				frequencyData = new Uint8Array(analyser.frequencyBinCount);

			audioSrc.connect(analyser);
			audioSrc.connect(ctx.destination);

			function renderFrame() {
				requestAnimationFrame(renderFrame);
				analyser.getByteFrequencyData(frequencyData);
				
				for(var i = 1; i <= NUMBER_OF_NODES; i++) {
					var nodeId = 'freq-node' + i;
					freqVisualizer.setNodeStyles(nodeId, frequencyData, i*2, i);
				}
			}

			//Initiate the whole thing
			audio.play(0);
			renderFrame();
		},

		setNodeStyles: function(el, freqArray, spectrum, index) {
			var el = document.getElementById(el),
				height = 'height:' + freqArray[spectrum] * 2 + 'px;',
				left = 'left:' + index * 6 + 'px',
				style = height + left;

				if(freqArray[spectrum] > 140 ) {
					el.className = 'freq-node blue';
				} else if(freqArray[spectrum] > 70 ) {
					el.className = 'freq-node green';
				} else {
					el.className = 'freq-node';
				}

			el.setAttribute('style', style);
		}
	}

	freqVisualizer.init();
})();