const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  console.log("Clicked");
  if (lockBoard) return;
  if (this === firstCard) return;

  console.log("flip");
  this.classList.add("flip");

  if (!hasFlippedCard) {
    console.log("!hasFlippedCard");
    hasFlippedCard = true;
    firstCard = this;
    console.log(firstCard);
    return;
  }

  secondCard = this;
  console.log(secondCard);
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  console.log("checkForMatch");
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  console.log(isMatch);
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  console.log("disableCards");
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  console.log("unflipCards");
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  console.log("resetBoard");
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  console.log("shuffle");
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
