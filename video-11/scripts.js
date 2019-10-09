const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let scoreNum = 0;
let messageScore = "Your Score Is: ";
let messageAttempts="Attempts: ";
let cardsOpen=[];
let attemptsNum=0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch===true){
    disableCards();
    score();
  }
  unflipCards();
  attempts();
}

function score() {
  scoreNum=++scoreNum;
  document.getElementById("score").innerText= messageScore + scoreNum;
  if (scoreNum===6){
    document.getElementById("message").innerText= "Congratulations you won!";
  }
}

function attempts(){
  ++attemptsNum;
  document.getElementById("attempts").innerText= messageAttempts+ attemptsNum;
}

function disableCards() {
  cardsOpen.push(firstCard);
  cardsOpen.push(secondCard);
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function redo() {
  resetBoard();
  for (var i = cardsOpen.length - 1; i >= 0; i--) {
    cardsOpen[i].classList.remove("flip");
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
  }
  scoreNum = 0;
  document.getElementById("score").innerText= messageScore + scoreNum;

  attemptsNum=0;
  document.getElementById("attempts").innerText= messageAttempts+ attemptsNum;

  document.getElementById("message").innerText="";
}

function newGame(){
  (function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.ceil(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();
  redo()
}

function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.ceil(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

cards.forEach(card => card.addEventListener('click', flipCard));


