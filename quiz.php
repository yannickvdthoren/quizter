<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>Quiz Infographie</title>
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="http://www.letelegramme.fr/css/telegramme.css">
	<script>
		var idJSON = '<?php echo $_GET['quizCorrect']; ?>';
	</script>
</head>
<body>
	<div id="sport">
		<section class="quiz">
			<div class="h6Line"><div><h6>Quiz</h6><span class="line"></span></div></div>
			<div class="questionsList">
				<ul class="evolution"></ul>
				<div class="result">
					<p id="resultScore"></p>
					<div id="resultText"></div>
				</div>
			</div>
			<div class="logoQuiz"></div>
			<div class="controlsQuiz">
				<a class="nextQuestion">Question suivante</a>
			</div>
		</section>

	</div>

	<script src="jquery-1.11.3.min.js" type="text/javascript"></script>
	<script src="main.js" type="text/javascript"></script>
</body>
</html>