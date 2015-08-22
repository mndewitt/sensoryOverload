(function() {
	var ctx = new AudioContext(),
		audio = document.getElementById('track'),
		audioSrc = ctx.createMediaElementSource(audio),
		analyser = ctx.createAnalyser(),
		frequencyData = new Uint8Array(analyser.frequencyBinCount);

	audioSrc.connect(analyser);
	audioSrc.connect(ctx.destination);

	//Basic frequency chart

	function renderFrame() {
		var freq = document.getElementById('freq'),
			totalNodes = 150,
			height;

		requestAnimationFrame(renderFrame);
		analyser.getByteFrequencyData(frequencyData);
		
		for(var i = 1; i <= totalNodes; i++) {
			var nodeId = 'freq-node' + i;
			setNodeStyles(nodeId, frequencyData, i*1, i);
		}
	}

	function setNodeStyles(el, freqArray, spectrum, index) {
		var el = document.getElementById(el),
			height = 'height:' + freqArray[spectrum] + 'px;',
			left = 'left:' + index * 8 + 'px',
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

	//Initiate the whole thing
	audio.play(0);
	renderFrame();
})();