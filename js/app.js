/*
 * Create a list that holds all of your cards
 */

$(document).on("load")



let allCards = Array.from($('li.card'));

let openCards = [];

let matchedCards = Array.from($('li.match'));

$('.deck').on('click', event => {
	const clickTarget = $(event.target);
	if (clickTarget.hasClass('card') && openCards.length < 2 ) {
		flipCards(clickTarget);
		addOpenCards(clickTarget);
		if (openCards.length ===2) {
			console.log('2cards')
			checkForMatch();
		}
		}
	});

function flipCards(clickTarget) {
	clickTarget.toggleClass('open');
	clickTarget.toggleClass('show');
};

function addOpenCards(clickTarget) {
	openCards.push(clickTarget);
}

function checkForMatch() {
	if ( openCards[0][0].innerHTML === openCards[1][0].innerHTML //error states can't find class name of undefined
		) {
		openCards[0][0].classList.toggle('match');
		openCards[1][0].classList.toggle('match');
		openCards = [];
		console.log('Match!');
	// change css to match, move cards from open -> matched array


	} else	{
		openCards[0][0].classList.toggle('open');
		openCards[0][0].classList.toggle('show');
		openCards[1][0].classList.toggle('open');
		openCards[1][0].classList.toggle('show');
		openCards = [];
		console.log('Not a match!');
	}


}




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
