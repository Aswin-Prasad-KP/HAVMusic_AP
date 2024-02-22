const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCard = null;
let matchedPairs = 0;
let attempts = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    const symbolsCopy = [...symbols, ...symbols];
    shuffle(symbolsCopy);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    symbolsCopy.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.addEventListener('click', () => flipCard(card, symbol));
        card.addEventListener('mouseover', () => enlargeCard(card));
        card.addEventListener('focus', () => enlargeCard(card));
        card.addEventListener('mouseout', () => shrinkCard(card));
        card.addEventListener('blur', () => shrinkCard(card));
        const cardInner = document.createElement('div');
        cardInner.classList.add('cardInner');
        const cardFront = document.createElement('div');
        cardFront.classList.add('cardFront');
        cardFront.textContent = symbol;
        const cardBack = document.createElement('div');
        cardBack.classList.add('cardBack');
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);
    });
}

function flipCard(card, symbol) {
    if (!card.classList.contains('matched') && card !== flippedCard) {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
            if (flippedCard) {
                attempts++;
                if (flippedCard.querySelector('.cardFront').textContent === symbol)
                    setTimeout(() => {
                        card.classList.add('matched');
                        flippedCard.classList.add('matched');
                        flippedCard = null;
                        matchedPairs++;
                        if (matchedPairs === symbols.length)
                            document.getElementById('message').textContent = `Congratulations! You've matched all pairs in ${attempts} attempts.`;
                    }, 500);
                else
                    setTimeout(() => {
                        card.classList.remove('flipped');
                        flippedCard.classList.remove('flipped');
                        flippedCard = null;
                    }, 500);
            } else
                flippedCard = card;
        } else
            flippedCard = null;
    }
}

function enlargeCard(card) {
    card.style.transform = 'scale(1.05)';
}

function shrinkCard(card) {
    card.style.transform = 'scale(1)';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'r' || event.key === 'R') {
        initializeGame();
        document.getElementById('message').textContent = '';
        flippedCard = null;
        matchedPairs = 0;
        attempts = 0;
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 's' || event.key === 'S') {
        initializeGame();
        document.getElementById('message').textContent = 'Shuffled the cards!';
    }
});

initializeGame();