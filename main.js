var result = 0;
var counter = 0;
$.getJSON( idJSON + '.json', function( data ) {
	var items = [];
	var questions = data.questions;

    // Pushing all the questions in the page
	i = 0;
	while(i < data.questions.length){
		var quizEvolution = document.querySelector('.evolution');
        var count = document.createElement('li');
        quizEvolution.appendChild(count);
        count.setAttribute('id', 'count' + i);

		var targetHTML = document.querySelector('.questionsList');
        var div = document.createElement('div'),
        	divQ = document.createElement('div'),
            divP = document.createElement('div'),
            divI = document.createElement('div'),
            br = document.createElement('br'),
            h4P = document.createElement('h4'),
        	p = document.createElement('p'),
        	pEx = document.createElement('p'),
        	ul = document.createElement('ul'),
        	h5 = document.createElement('h5'),
        	text = data.questions[i].question,
            h5Text = document.createTextNode(text),
            explanations = data.questions[i].explanations,
            pExpl = document.createTextNode(explanations);

		targetHTML.appendChild(div);
		div.setAttribute('id', 'panel' + i);
        div.setAttribute('class', 'panels');
        div.setAttribute('data-panel', i);
        div.appendChild(divI);
        divI.setAttribute('id', 'image' + i);
        divI.setAttribute('class', 'image');
        div.appendChild(divQ);
        divQ.setAttribute('id', 'question' + i);
        divQ.setAttribute('class', 'questions');
        divQ.appendChild(h5);
        h5.appendChild(h5Text);
        divQ.appendChild(ul);
        ul.setAttribute('class', 'ulchoice')

        f = 0;
        while(f <= 2){
        	li = document.createElement('li'),
        	choice = data.questions[i].choices[f].choice,
        	choiceText = document.createTextNode(choice),
            correct = data.questions[i].choices[f].correct;
        	
        	li.appendChild(choiceText);
        	ul.appendChild(li);
        	li.setAttribute('id', 'choice' + f);
            li.setAttribute('class', 'choices');
            li.setAttribute('data-correct', correct);

        	f++;
        };

        div.appendChild(divP);
		divP.setAttribute('id', 'answer' + i);
        divP.setAttribute('class', 'answers');
        divP.appendChild(h4P);
        h4P.setAttribute('id', 'h4Answers' + i);
        divP.appendChild(pEx);
        pEx.appendChild(pExpl);

        document.querySelector('#image'+ i).style.backgroundImage = 'url(images/image'+i+'.jpg)';
        div.appendChild(br);
        br.setAttribute('style', 'clear:both;');

        document.getElementById('count' + i).style.width = 100 / data.questions.length + "%";

        i++;
	};

    // When you click on an answer
    var classChoices = document.querySelectorAll('.choices');
    y = 0;

    for(var x=0; x<classChoices.length; x++)
    {
      classChoices[x].addEventListener('click', function checkAnswer(e){

            var panel = e.target.parentElement.parentElement.parentElement.dataset.panel;
            var countPanel = e.target.parentElement.parentElement.parentElement.dataset.panel;

            while(y < 1){ //disabled the style change on click !
                if (e.target.dataset.correct == 'true'){
                //if the answer was good, add a green color on the selected item and display a message like "Good response!" 
                    e.target.classList.add('right');
                    document.getElementById('count' + countPanel).classList.add('right');
                    document.getElementById('h4Answers'+ countPanel).innerHTML = "Bonne réponse !";
                    result++; //Save the number of good answers.
                }
                else{
                //if not good, add a grey color on the selected item and display a message like "Bad response !" 
                    e.target.classList.add('selected');
                    document.getElementById('count' + countPanel).classList.add('wrong');
                    document.getElementById('h4Answers' + countPanel).innerHTML = "Mauvaise réponse !";
                }
                
                y++;
            };

            // transform the style of the panel + display the answer + activate the next button.
            document.getElementById('panel' + panel).classList.add('checked');
            document.querySelector('.nextQuestion').classList.add('next');

            document.querySelector('.nextQuestion').addEventListener('click', nextQuestion, true);

            var stop = data.questions.length - 1;
            
            if(counter < stop){
                function nextQuestion(){
                    //go to the next panel and 
                    document.getElementById('panel' + panel).style.display = "none";
                    nextPanel = panel++;
                    document.getElementById('panel' + panel).style.display = "block";
                    document.querySelector('.nextQuestion').removeEventListener('click', nextQuestion, true);
                    document.querySelector('.nextQuestion').classList.remove('next');
                    y = 0;
                };
                counter++;
            }
            else{
                //when we reach the latest question, transform the button and returns to the result page.
                document.querySelector('.nextQuestion').removeEventListener('click', nextQuestion, true);
                document.querySelector('.nextQuestion').innerHTML = "Résultat";
                document.querySelector('.nextQuestion').addEventListener('click', viewResult, true);
                function viewResult(){
                    document.getElementById('panel' + panel).style.display = "none";
                    document.querySelector('.result').style.display = "block";
                
                    document.getElementById('resultScore').innerHTML = result + '/' + data.questions.length;
                    
                    var x = data.questions.length;
                    var resultPourcent = result*100/x;
                    var BreakException= {};
                    try {
                        data.resultText.forEach(function(element, index) {

                          if( resultPourcent <= element.pourcent){
                            document.getElementById('resultText').innerHTML = element.text;
                            throw BreakException;
                          }
                        });
                    } 
                    catch(e) {
                        if (e!==BreakException) throw e;
                    };

                    document.querySelector('.nextQuestion').innerHTML = "Recommencer";
                    document.querySelector('.nextQuestion').addEventListener('click', function restart(){
                        location.reload();
                    },true);
                };
            };
        
        }, false);
    };
});

window.onload = function(){console.log('Ready !')}




