# Memory Game Project

## Instructions

This project is built for memory game.
This game is a simple game. In order to win this game, the player needs to match all cards in the end.
Less steps the play uses, more stars you will win.


##  Files
  _index.html_
  _js/app.sj_
  _css/app.css_

### Starts From js/app.js files
**Step 1: Global Parameters**
I create some global parameters.
In the following part of this file, these global parameters will be modified.
`const restart = document.querySelector('.restart');
 const cards = document.querySelectorAll('.card');
 let size = cards.length / 2;
 let t = 0;
 let prevCard;
 let moves = 0;`

**Step 2: Convert NodesList to array**
I need to convert NodesList selected from HTML file to array for shuffle purpose.
Because the shuffle function needs the arguments of array data type.

  `let arr = [];
   for (let card of cards) {
     arr.push(card);
   }`

 **Step 3: Restart Game Icon**
 The game has to be restarted when a player click the restart icon each time.
 So, cards needs to be re-shuffled and then are appended back to html. In the meantime,
 all global parameters are also needed to be re-initialized.

 `restart.addEventListener('click', function() {
 const newCards = shuffle(arr);
 const fragment = document.createDocumentFragment();

 for(let newCard of newCards) {
    newCard.classList.remove("show");
    newCard.classList.remove("open");
    newCard.classList.remove("match");
    fragment.appendChild(newCard);
 }
 document.querySelector(".deck").appendChild(fragment);
 prevCard = null;
 moves = 0;
 initialTimer();
})`

**Step 4: Stars Rating System**
The result of stars rating depends on the total number of moves.
Here I defined then moves less than 20, then three stars are all #ebf442 color,
If the moves larger than 20 but less than 30, then two stars will still be #ebf442
color. But the third star will become grey color. `count` here is used to count
current colored stars. `evlu` is used to store the calculation results of movements.

`const stars = document.querySelector('.stars');
 const numStars = stars.children;

 function ratings() {
   const evlu = moves < 20 ? 3 : (moves < 30 ? 2 : 1);
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
 }`

**Step 5: Playing Cards**
Then the player starts to play the game. The number of moves `move` will be stored.
rating system will be updated by `ratings()`. `movements()` will display the total moves to
the screen. Here, I need to use `prevCard` to store the player's previous picked card.
There are total four conditions needed to be considered:
  (a) `prevCard == null &&  moves == 1`:
      It means the player start to pick the first card. No any previous
      selected card for this first move. Timer starts to work.
  (b) `prevCard == null`, I need to use `prevCard` to store the current card as the previous state.
       Then player can move on to choose the next card.
  (c) `prevCard != e.target && prevCard.firstElementChild.classList.contains(selectCard)`
       this code means `prevCard` and current card are match!!
  (d) Otherwise, `prevCard` and current card are not match, then these two cards are needed
      to be recovered as the un-selected state. I used a `setTimeout()` to postpone this
      recovering operation.

**Step 6: Win and restart**
  When the player win, means all cards are matched, then the screen will show the results,
  including the total time and total stars.
  And it also has a button to re-start the game.

**Step 7: Timer**
  There is a clock to count the how many seconds the player used to play this game.
  I used `setTimeout()` to implement the clock function. But the clock needs to be
  reset when the game is restarted. Here I use a `initialTimer()` function to initialize the
  timer.

  ` function initialTimer() {
     t = 0;
     clearTimeout(timeHandle);
     return t;
   }`
