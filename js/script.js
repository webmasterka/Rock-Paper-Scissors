'use strict';

var params = {
    round: 0,
    userChoice:'',
    computerChoice:'',
    userScore: 0,
    computerScore: 0,
    rounds: 0,
    gameOver: false,
    userSpanDisplay: document.getElementById('user-score'),
    computerSpanDisplay: document.getElementById('computer-score'),
    selectMove: document.getElementsByClassName('player-move'),
    choices: document.querySelector('.choices'),
    start: document.getElementById('button'),
    result: document.querySelector('.result > p'),
    result1: document.querySelector('.result1 > p'),
    modal: document.getElementById('modal-overlay'),  
    closeButtons: document.querySelectorAll('.modal .close'),
    progress: []
}

function getComputerChoice () {
	var choices = ['r','p','s'];
	var randomNumber = Math.floor(Math.random() * 3);
	return choices[randomNumber];
}

function convertToWord(letter) {
	if (letter === 'r') return "Rock";
	if (letter === 's') return "Scissors"; 
	if (letter === 'p') return "Paper"; 
}

function round() {
	params.rounds = window.prompt('How many rounds would you like to play?');
	
	if (params.rounds == '' || params.rounds == null 
      || isNaN(params.rounds) == true || params.rounds <= 0 
      || params.rounds % 1 !== 0) { 
		alert('You should give the positive number!');
    }
    return params.rounds;
}

function play() {
  
	params.result1.innerHTML = '<br>' + 'You played ' + convertToWord(params.userChoice) + ' and computer played ' + convertToWord(params.computerChoice);
  
	if (params.computerScore == params.rounds || params.userScore == params.rounds) return params.gameOver = true;
		switch (params.userChoice + params.computerChoice) {
		    case "sp":
			case "pr":
			case "rs": 
			params.result1.innerHTML += '<p> YOU WON! :) </p>';
            params.userScore++;
            params.round++;  
            params.progress.push({content: params.round + '. You played ' + convertToWord(params.userChoice) + ' and computer played ' + convertToWord(params.computerChoice) +' (' + params.userScore +':'+ params.computerScore +  ')' + '<p> YOU WON! :) </p>'});
			break;
			case 'ps':
			case 'rp':
			case 'sr':  
			params.result1.innerHTML += '<p> YOU LOSED! :( </p>';
			params.computerScore++;
            params.round++;  
            params.progress.push({content: params.round + '. You played ' + convertToWord(params.userChoice) + ' and computer played ' + convertToWord(params.computerChoice) +' (' + params.userScore +':'+ params.computerScore +  ')' + '<p> YOU LOSED! :( </p>'});   
			break;
			case 'ss':
			case 'pp':
			case 'rr':
            params.round++;   
			params.result1.innerHTML += '<p> YOU TIED! </p>';
            params.progress.push({content: params.round + '. You played ' + convertToWord(params.userChoice) + ' and computer played ' + convertToWord(params.computerChoice) +' (' + params.userScore +':'+ params.computerScore +  ')' + '<p> YOU TIED! </p>'});
			break;
		}
  
	    params.userSpanDisplay.innerHTML = params.userScore;
	    params.computerSpanDisplay.innerHTML = params.computerScore;
  
	    if (params.computerScore == (params.rounds) && params.userScore == (params.rounds) ) {
            const gameScore = params.progress.map(el => el.content).join('');
            params.result.innerHTML = gameScore + '<br>' + '<h3> YOU TIED! </h3>';
            params.choices.classList.add('hide');
            params.modal.classList.add('show');
            params.progress.length = 0; 
        } 
        else if (params.userScore == (params.rounds)) {
            const gameScore = params.progress.map(el => el.content).join('');
            params.result.innerHTML = gameScore + '<br>' + '<h3> YOU WON GAME! :) </h3>';
            params.choices.classList.add('hide');
            params.modal.classList.add('show'); 
            params.progress.length = 0;  
        }
        else if (params.computerScore == (params.rounds)) {
            const gameScore = params.progress.map(el => el.content).join('');
            params.result.innerHTML = gameScore + '<br>' + '<h3> YOU LOST GAME! :( </h3>';
            params.choices.classList.add('hide');
            params.modal.classList.add('show'); 
            params.progress.length = 0;  
        }
    }

    function main () {

	    params.start.addEventListener('click',function() {
		
            if (params.gameOver === false) {
                params.rounds = round();
                params.userScore = 0;
                params.computerScore=0;
                params.round=0;
                params.userSpanDisplay.innerHTML = params.userScore;
                params.computerSpanDisplay.innerHTML = params.computerScore;
                params.result.innerHTML = 'Good Luck :)';     
            }
            
            params.choices.classList.remove('hide');
            params.start.innerText = 'Once again';
	    })
  
	
        for (var p = 0; p < params.selectMove.length; p++) {
            params.selectMove[p].addEventListener('click', function () {
                var choice = this.getAttribute('id');
                params.userChoice = choice;
                params.computerChoice = getComputerChoice();
                 play();
            });
        }
    }


main();

//Modal

(function(){ 
    
	var showModal = function(event){
		event.preventDefault();
		var items = document.querySelectorAll('.overlay .modal');
		for (var i = 0; i < items.length; i++) {
			items[i].classList.remove('show');

		}
		document.querySelector('#modal-overlay').classList.add('show');
		document.querySelector(event.target.getAttribute('href')).classList.add('show');
	};
	
	var modalLinks = document.querySelectorAll('.show-modal');
	
	for (var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click', showModal);
	}
	
	var hideModal = function(event){
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    document.querySelector('#modal-overlay').addEventListener('click', hideModal);
    
    for(var i = 0; i < params.closeButtons.length; i++){
        params.closeButtons[i].addEventListener('click', hideModal);
    }

    for(var i = 0; i < params.modals.length; i++){
        params. modals[i].addEventListener('click', function(event){
            event.stopPropagation();
        });
    }

})(); 