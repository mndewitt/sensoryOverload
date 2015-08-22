(function() {
	var ctx = new AudioContext(),
		audio = document.getElementById('track'),
		audioSrc = ctx.createMediaElementSource(audio),
		analyser = ctx.createAnalyser(),
		frequencyData = new Uint8Array(analyser.frequencyBinCount);

	audioSrc.connect(analyser);
	audioSrc.connect(ctx.destination);

	function renderFrame() {
		var freq = document.getElementById('freq'),
			totalNodes = 50,
			height;

		requestAnimationFrame(renderFrame);
		analyser.getByteFrequencyData(frequencyData);
		
		for(var i = 1; i <= totalNodes; i++) {
			var nodeId = 'freq-node' + i;
			setNodeDimensions(nodeId, frequencyData, i*20, i);
		}
	}

	function setNodeDimensions(el, freqArray, spectrum, index) {
		var el = document.getElementById(el),
			height = 'height:' + freqArray[spectrum] * 2 + 'px;',
			left = 'left:' + index * 15 + 'px',
			style = height + left;

		el.setAttribute('style', style);
	}

	audio.play();
	renderFrame();
})();