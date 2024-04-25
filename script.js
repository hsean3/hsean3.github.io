// script.js
document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const cardImages = ['hook.jpeg', 'maui.jpeg', 'puta.jpeg']; // Make sure these paths are correct
    let cards = [];
    let cardsFlipped = [];
    let matchesFound = 0;

    // Create cards, double them for pairs, shuffle
    let cardDeck = [...cardImages, ...cardImages].sort(() => 0.5 - Math.random());

    cardDeck.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-front');

        const backFace = document.createElement('div');
        backFace.classList.add('card-back');
        backFace.style.backgroundImage = `url(${image})`;

        card.appendChild(frontFace);
        card.appendChild(backFace);
        gameBoard.appendChild(card);
        cards.push(card);

        card.addEventListener('click', () => {
            if (!card.classList.contains('flip') && cardsFlipped.length < 2) {
                flipCard(card);
            }
        });
    });

    function flipCard(card) {
        if (cardsFlipped.length === 1 && cardsFlipped[0] === card) {
            playSound('card-flip.mp3');
            return; // Prevent flipping the same card twice
        }

        card.classList.add('flip');
        playSound('card-flip.mp3'); // Play flip sound
        cardsFlipped.push(card);

        if (cardsFlipped.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = cardsFlipped;

        if (firstCard.dataset.image === secondCard.dataset.image) {
            // Match found
            matchesFound++;
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            cardsFlipped = [];

            if (matchesFound === cardImages.length) {
                // All matches found, game won
                celebrate();
            }
        } else {
            // No match, flip cards back after a delay
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                cardsFlipped = [];
            }, 1500);
        }
    }

    function celebrate() {
        // Play applause and show confetti
        playSound('applause.wav');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    function playSound(sound) {
        const audio = new Audio(sound);
        audio.play();
    }

    const resetButton = document.getElementById('reset-button');

    // Event listener for the reset button
    resetButton.addEventListener('click', function() {
        // Reload the page
        window.location.reload();
    });
});
