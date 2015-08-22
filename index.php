<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="dist/style.css">
	</head>

	<body>

		<audio id="track" src="testAudio/juhuu.mp3"></audio>

		<div class="visual-container">
			<div class="freq-node-container">
				<?php
				//php cuz easy
				for( $i = 1; $i <= 50; $i++) { ?>
					<div class="freq-node" id="freq-node<?php echo $i; ?>"></div>
				<?php } ?>
			</div>
		</div>

		<script type="text/javascript" src="dist/scripts.min.js"></script>
	</body>
</html>