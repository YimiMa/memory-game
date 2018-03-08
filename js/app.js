/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 //==============================================================================
 //========================= Random Shuffle Cards ===============================
 //==============================================================================
 // Find the restart button.
 const restart = document.querySelector('.restart');
 // Find all cards in the webpage.
 const cards = document.querySelectorAll('.card');
 // Set previous picked cards
 let prevCard;

 const game = {
   // The total number of unique cards
   size : cards.length / 2,
   // Set the timer
   t : 0,
   // Define the total number of Moves
   moves : 0
 };
 // Convert NodesList to array.
 let arr = [...cards];

 // Event : When click the restart button, all cards are shuffled randomly.
 restart.addEventListener('click', function() {
   // Applying the shuffle function.
   const newCards = shuffle(arr);
   // Create fragment.
   const fragment = document.createDocumentFragment();

   for(let newCard of newCards) {
      newCard.classList.remove("show");
      newCard.classList.remove("open");
      newCard.classList.remove("match");
      fragment.appendChild(newCard);
   }
    //Appende all new cards to the previous deck as its new child.
   document.querySelector(".deck").appendChild(fragment);
   // Re-initialize the previous selected card.
   prevCard = null;
   game.size = cards.length / 2;
   prevCard = null;
   game.moves = 0;
   movements();
   initialRatings();
   initialTimer();
   startTimer();
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
 //==============================================================================
 //================================= Play Game ==================================
 //==============================================================================
 // Rating of stars
 const stars = document.querySelector('.stars');
 const numStars = stars.children;

 function ratings() {
   const evlu = game.moves < 20 ? 3 : (game.moves < 30 ? 2 : 1);
   let count = 0;
   for (let star of numStars) {
     if (count >= evlu) {
       star.firstElementChild.style.color = 'grey';
     } else {
       star.firstElementChild.style.color = '#ebf442';
     }
     count++;
   }
   return evlu;
 }

 // Initialize the star rating
 function initialRatings() {
   for (let star of numStars) {
     star.firstElementChild.style.color = 'grey';
   }
 }
 // Picking Cards
 const deck = document.querySelector('.deck');
 deck.addEventListener('click', function(e) {
   ratings();
   movements();
   const selectCard = e.target.firstElementChild.classList[1];
   if (e.target.className == 'card') {
     // First action: choose the first card, timer starts to work
     if (prevCard == null && game.moves == 0) {
       initialTimer();
       gameTimer();
     }
     // If the previous two cards don't match or first time to pick card.
     if (prevCard == null) {
      prevCard = e.target;
      e.target.setAttribute('class', 'card open show');
    }
     // When previous card == current card
     else if (prevCard != e.target
       && prevCard.firstElementChild.classList.contains(selectCard)) {
       prevCard.setAttribute('class', 'card match');
       e.target.setAttribute('class', 'card match');
       // size is the total number of remaing cards
       game.moves++
       game.size--;
       movements();
       if (game.size == 0) {
         win();
       }
       prevCard = null;
     }
     // Preious card != Current Card
     else {
      e.target.setAttribute('class', 'card open show');
      // If cards are not match ;
      setTimeout(function () {
        if (!prevCard.firstElementChild.classList.contains(selectCard)) {
          prevCard.setAttribute('class', 'card');
          e.target.setAttribute('class', 'card');
        }
        prevCard = null;
      }, 200);
      game.moves++;
      movements();
    }
  }
 });

 // Win
 function win(){
   const totalTime = document.querySelector('#timer').innerText;
   const totalStars = ratings();
   document.querySelector('.container').style.display = 'none';
   document.querySelector('.final-result').style.display = 'flex';
   document.querySelector('.total-time').innerText = totalTime;
   document.querySelector('.total-stars').innerText = totalStars + ' stars.';
   initialTimer();
 }

 // Display the total movements.
 function movements() {
   document.querySelector('#move').innerText = 'Total steps: ' + game.moves + ' moves.';
 }
 //=============================================================================
 //===========================   Restart  Game  ================================
 //=============================================================================
 const restGame = document.querySelector('.reset-game');
 restGame.addEventListener('click', function() {
   // Applying the shuffle function.
   const newCards = shuffle(arr);
   // Create fragment.
   const fragment = document.createDocumentFragment();

   for(let newCard of newCards) {
      newCard.classList.remove("match");
      fragment.appendChild(newCard);
   }
    //Appende all new cards to the previous deck as its new child.
   document.querySelector(".deck").appendChild(fragment);
   document.querySelector('.container').style.display = 'flex';
   document.querySelector('.final-result').style.display = 'none';
   prevCard = null;
   game.size = cards.length / 2;
   game.moves = 0;
   initialRatings();
   movements();
   initialTimer();
   startTimer();
 })
 //==============================================================================
 //============================     Set Timer    ================================
 //==============================================================================
 let timeHandle;

 function gameTimer() {
   game.t = checkTime(game.t);
   document.querySelector('#timer').innerText = 'Total time: ' + game.t + ' s';
   timeHandle = setTimeout(gameTimer, 1000);
 }

 function checkTime(t) {
   return ++t;
 }

 function initialTimer() {
   game.t = 0;
   clearTimeout(timeHandle);
   return game.t;
 }

function startTimer() {
  document.querySelector('#timer').innerText = 'Total time: ' + 0 + ' s';
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
