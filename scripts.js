(function() {
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
		console.log(frequencyData)
	}
	audio.play();
	renderFrame();
})();