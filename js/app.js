/*
 * Create a list that holds all of your cards
 */

let allCards = Array.from($('li.card'));

let openCards = [];

let matchedCards = [];

let moves = 0;

let sec = 0;
let min = 0;
let timer;
let stars = 0;

//timer functions (source:https://gwgnanodegrees.slack.com/files/UA8PXHUR3/FB0Q3CSMB/Getting_the_Memory_Game_timer_to_work)

function startTimer() {
	timer = setInterval(insertTime,1000);
};

function stopTimer(){
	clearInterval(timer);
}

function insertTime() {
	sec++;
	if (sec < 10) {
		sec = `0${sec}`;
	}
	if (sec >= 60) {
		min++;
		sec = "00";
	}

	let output = "0"+ min + ":" + sec;

	//display time

	$('.timer').empty();
	$('.timer').append(output);
};

$(document).ready(function(){
	startTimer();
	insertTime();
});


//refresh function
$('i.fa-repeat').on('click', event => {
	const clickTarget = $(event.target);
	if (clickTarget.hasClass('fa-repeat')) {
		window.location.reload(false);
	}	
});




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




$('.deck').on('click', event => {
	const clickTarget = $(event.target);
	if (clickTarget.hasClass('card') && 
		!clickTarget.hasClass('match') &&
		openCards.length < 2 &&
		!openCards.includes(clickTarget)
		) {
		flipCards(clickTarget);
		addOpenCards(clickTarget);
		if (openCards.length ===2) {
			console.log('2cards')
			checkForMatch();
			movesCount();
			gamedone(); //add function for done modal
			starCount();
			
			
		}
		}
	});
//Moves count function 
function movesCount() {
	$('span.moves').empty();
	++moves;
	$('span.moves').append(moves);
}

//star count function
function starCount() {
	if (moves <= 12) {
		stars = 3;
	}

	if (moves > 12) {
		$('#three').remove();
		stars = 2;
	} 
	if (moves >= 20) {
		$('#two').remove();
		stars = 1;
	}

};

//function to show cards
function flipCards(clickTarget) {
	clickTarget.toggleClass('open');
	clickTarget.toggleClass('show');
};
//function to move cards to open array
function addOpenCards(clickTarget) {
	openCards.push(clickTarget);
};
//Check if cards match and move them to the matchedCards array
function checkForMatch() {
	if ( openCards[0][0].innerHTML === openCards[1][0].innerHTML 
		) {
		openCards[0][0].classList.toggle('match');
		openCards[1][0].classList.toggle('match');
		matchedCards.push(openCards[0][0]);
		matchedCards.push(openCards[0][1]);
		openCards = [];
		console.log('Match!');
	} else	{
		setTimeout(() => {
			openCards[0][0].classList.toggle('open');
			openCards[0][0].classList.toggle('show');
			openCards[1][0].classList.toggle('open');
			openCards[1][0].classList.toggle('show');
			openCards = [];
		}, 800);
		
	}


};
// when all cards are matched show game complete message
function gamedone() {
	if (matchedCards.length === 16) {
		stopTimer();
		console.log("Game Complete!")
		writeGameStats();
		togglePopup();
		//need to add toggle popup
	}
}

//function to pull stats for popup
function writeGameStats() {
	const timeStat = $('.timeStat');
	const clockTime = $('span.timer').html();
	const movesStat = $('.movesStat');
	const starsStat = $('.starsStat')

	timeStat.html(`Time = ${clockTime}`);
	movesStat.html(`Moves = ${moves}`);
	starsStat.html(`Stars = ${stars}`);
}


//function to toggle Stats popup
function togglePopup() {
	const modal = $('.popupBackground');
	modal.toggleClass('hideit');
}
//cancel button on popup
$('.popupCancel').on('click',() =>{
	togglePopup();
});

//Replay button
$('.popupReplay').on('click', () => {
	window.location.reload(false);
});



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//function setup from https://matthewcranford.com/memory-game-walkthrough-part-4-shuffling-decks/
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		$('.deck').append(card);
	}
}
shuffleDeck();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
