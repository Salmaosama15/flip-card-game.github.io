const gameBoard = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const message = document.getElementById("message");

let cards = [];
let flippedCards = [];
let gameStarted = false;
let timer;

const images = [
  "C:UsersHPOneDriveDesktopInternship Bank Misrcard games session12 javascript part 2house 22.jpg",
  "C:UsersHPOneDriveDesktopInternship Bank Misrcard games session12 javascript part 2house 11.jpg",
  "C:UsersHPOneDriveDesktopInternship Bank Misrcard games session12 javascript part 2house4.jpg",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(image) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.image = image;

  const front = document.createElement("img");
  front.src = image;
  front.classList.add("front");

  const back = document.createElement("div");
  back.classList.add("back");

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", handleCardClick);

  return card;
}

function handleCardClick(event) {
  const card = event.target.closest(".card");
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.image === secondCard.dataset.image) {
      firstCard.classList.add("hidden");
      secondCard.classList.add("hidden");
      flippedCards = [];
      checkForWin();
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  } else {
    timer = setTimeout(() => {
      card.classList.remove("flipped");
      flippedCards.pop();
    }, 5000);
  }
}

function checkForWin() {
  const allCards = document.querySelectorAll(".card");
  if (Array.from(allCards).every((card) => card.classList.contains("hidden"))) {
    message.textContent = "You win!";
    gameStarted = false;
  }
}

function startGame() {
  gameBoard.innerHTML = "";
  cards = [];
  flippedCards = [];
  gameStarted = true;
  message.textContent = "";

  const imagePairs = images.concat(images);
  shuffleArray(imagePairs);

  imagePairs.forEach((image) => {
    const card = createCard(image);
    cards.push(card);
    gameBoard.appendChild(card);
  });
}

resetButton.addEventListener("click", startGame);

startGame();
