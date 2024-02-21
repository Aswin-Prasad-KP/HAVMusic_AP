const symbols = ['😀', '😁', '😎', '😊', '🥳', '😄', '😃', '😆'];
let shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
let firstCard = null;
let secondCard = null;
let canFlip = true;

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = '<span class="front"></span><span class="back">' + symbol + '</span>';
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (!canFlip || this === firstCard || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.back').innerHTML === secondCard.querySelector('.back').innerHTML;
  
    if (isMatch) {
      // Add 'matched' class to both cards
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
  
      // Remove the event listeners to prevent further flips
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      resetCards();
    } else {
      // No match, flip them back over
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
      }, 1000);
    }
  }
  
  

function resetCards() {
  firstCard = null;
  secondCard = null;
  canFlip = true;
}

function initGame() {
  const cardsContainer = document.getElementById('cards');

  shuffledSymbols.forEach(symbol => {
    const card = createCard(symbol);
    cardsContainer.appendChild(card);
  });
}

initGame();
