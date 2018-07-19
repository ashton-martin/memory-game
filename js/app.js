

let moves = 0; 

/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");

//adds the deckCard to the list of open cards in an array
let toggledCards = [];

// Shuffle cards at startup
shuffleDeck();

// Controls the state of the clock being on or off
let clockOff = true;

//holds the incremented value of time
let time = 0;

// clock
let clockId;

// counter variable for matched pairs
let matched = 0; 
// number of actual pairs in the game
const totalPairs = 8; 

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

function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.append(card);
  }
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


// Event listener for when to start the clock

 deck.addEventListener("click", event => {
   const deckCard = event.target;
   if(isClickValid(deckCard)) {
    if(clockOff) {
      startClock();
      clockOff = false;
    }
     toggleCard(deckCard);
     addToggledCard(deckCard);
//compares the two cards that have been clicked on     
     if (toggledCards.length === 2) {
       checkForMatch(toggledCards);
       addMove();
       checkScore();
     }
    }
 });

//function for to add cards to comparison array that have not already been matched
 function isClickValid(deckCard){
  return (deckCard.classList.contains("card") && !deckCard.classList.contains("match") &&
    toggledCards.length < 2 && !toggledCards.includes(deckCard));
 };

// Seperate toggling into own function for code readability
  function toggleCard(card){
    //const card = event.target;
      card.classList.toggle("open");
      card.classList.toggle("show");


    };

  function addToggledCard(){
    const card = event.target;
    toggledCards.push(card);
    console.log(toggledCards);
  };

  function checkForMatch(){
    if(toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
      toggledCards[0].classList.toggle("match");
      toggledCards[1].classList.toggle("match");
      toggledCards = [];
      matched++;
      console.log(matched);
      if (matched === 1){
        gameOver();
      } 
    } else {
        setTimeout(() => {
          toggleCard(toggledCards[0]);
          toggleCard(toggledCards[1]);
          toggledCards = [];
        }, 1000);
      }
  };

  function addMove() {
    moves++;
    const movesText = document.querySelector(".moves");
    movesText.innerHTML = moves; 
  };

  function checkScore() {
    if (moves === 8 || moves === 16) {
      hideStar();
    }
  };

  function hideStar(){
    const starList = document.querySelectorAll(".stars li");
    for (star of starList) {
      if (star.style.display !== "none"){
        star.style.display = "none";
        break;
      }
    }
  };

  function startClock(){
    clockId = setInterval(() => {
      time++;
      displayTime();
    }, 1000)
  }

  function stopClock(){
    clearInterval(clockId);
  }
  
  function displayTime(){
    const clock = document.querySelector(".clock");
    clock.innerHTML = time; 
    //adjusts time
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
      clock.innerHTML = `${minutes}:0${seconds}`
    } else  {
      clock.innerHTML =  `${minutes}:${seconds}`
    }  
    
  };

  function toggleModal(){
    const modal = document.querySelector(".modal_background");
    modal.classList.toggle("hide");
  }
  //toggleModal();

function writeModalStats(){
  const timeStat = document.querySelector(".modal_time");
  const clockTime = document.querySelector(".clock").innerHTML;
  const movesStat = document.querySelector(".modal_moves");
  const starsStat = document.querySelector(".modal_stars");
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars(){
  stars = document.querySelectorAll(".stars li");
  starCount = 0; 
  for (star of stars){
    if (star.style.display !== "none"){
      starCount++
    }
  }
  return starCount;
}

document.querySelector(".modal_cancel").addEventListener("click", () => {
  toggleModal();
});

document.querySelector(".modal_replay").addEventListener("click",() =>{
	replayGame();
}); 

document.querySelector(".restart").addEventListener("click",() =>{
	resetGame();
}); 

function resetGame(){
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();
}

function replayGame(){
  resetGame();
  toggleModal();
}

function resetClockAndTime(){
  stopClock();
  clockOff = true; 
  time = 0; 
  displayTime();
}matched

function resetMoves() {
  moves = 0; 
  document.querySelector(".moves").innerHTML = moves;  
}

function resetStars(){
  stars = 0; 
  const starList = document.querySelectorAll(".stars li");
  for (star of starList) {
    star.style.display = "inline"; 
  }
}

function resetCards(){
  const cards = document.querySelectorAll(".deck li");
  for (let card of cards){
    card.className = "card";
  }
}

function gameOver(){
  stopClock();
  writeModalStats();
  toggleModal();
}


// time = 121;
// displayTime();
// moves = 16; 
// checkScore();

// writeModalStats();
// toggleModal();
