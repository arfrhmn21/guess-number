// instagram: @arfrhmn21_

let difficultyContainer = document.getElementById("difficultyContainer");
let difficultyForm = document.getElementById("difficultyForm");
let gameContainer = document.getElementById("gameContainer");
let startButton = document.getElementById("startButton");
let tebakAngka = document.getElementById("tebakAngka");

let chancesLeft;
let randomNumber;
let range;
let chancesNumber = document.getElementById("chancesNumber");

function renderChances() {
  chancesNumber.textContent = chancesLeft;
}

function updateStartButton() {
  let selectedDifficulty = document.querySelector('input[name="difficulty"]:checked');
  let selectedRange = document.querySelector('input[name="range"]:checked');

  if (selectedDifficulty && selectedRange) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

difficultyForm.addEventListener("change", function() {
  updateStartButton();
});

function startGame(difficulty, range) {
  difficultyContainer.style.display = "none";
  gameContainer.style.display = "flex";

  chancesLeft = getChancesByDifficulty(difficulty);
  setRange(range);
  randomNumber = Math.floor(Math.random() * range) + 1;
  console.log(randomNumber);
  let message = document.getElementById("message");
  let guessInput = document.getElementById("guessInput");
  let guessButton = document.getElementById("guessButton");
  let restartButton = document.getElementById("restartButton");

  message.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.style.display = "inline";
  restartButton.style.display = "none";
  chancesNumber.style.display = "inline";
  
  renderChances();

  tebakAngka.textContent = "Tebak angka dari 1-" + range + ":";
}

function setRange(selectedRange) {
  let guessInput = document.getElementById("guessInput");
  guessInput.setAttribute("min", "1");
  guessInput.setAttribute("max", selectedRange);
}

function getChancesByDifficulty(difficulty) {
  switch (difficulty) {
    case "easy":
      return 5;
    case "normal":
      return 3;
    case "hard":
      return 2;
    case "hardest":
      return 1;
    default:
      return 3;
  }
}

function restartGame() {
  let difficulty = document.querySelector('input[name="difficulty"]:checked');
  let range = document.querySelector('input[name="range"]:checked');
  
  if (difficulty && range) {
    startGame(difficulty.value, range.value);

    difficulty.checked = false;
    range.checked = false;
  }
}

difficultyForm.addEventListener("submit", function(event) {
  event.preventDefault();
  restartGame();
});

document.getElementById("guessForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let guessInput = document.getElementById("guessInput");
  let message = document.getElementById("message");
  let guessButton = document.getElementById("guessButton");
  let restartButton = document.getElementById("restartButton");

  let guess = parseInt(guessInput.value);

  if (guess === randomNumber) {
    message.textContent = "Selamat! Anda berhasil menebak angka dengan benar.";
    guessInput.disabled = true;
    guessButton.style.display = "none";
    restartButton.style.display = "inline";
    message.classList.remove("red");

    let winSound = document.getElementById("winSound");
    winSound.play();
  } else {
    if (guessInput.value === "") {
      message.textContent = "Error!";
      message.classList.remove("red");

      if (navigator.vibrate) {
        navigator.vibrate(400);
      }
      return;
    }

    if (guess < randomNumber) {
      message.textContent = "Angka terlalu kecil. Coba lagi!";

        if (navigator.vibrate) {
          navigator.vibrate(400);
        }
    } else {
      message.textContent = "Angka terlalu tinggi. Coba lagi!";

          if (navigator.vibrate) {
          navigator.vibrate(400);
        }
    }

    message.classList.add("shake", "red");
    setTimeout(function() {
      message.classList.remove("shake");
    }, 400);
    guessInput.value = "";
    guessInput.focus();
    chancesLeft--;

    renderChances();

    if (chancesLeft === 0) {
      message.classList.remove("red", "shake");
      message.textContent = "Permainan berakhir. Angka yang benar adalah " + randomNumber + ".";
      guessInput.disabled = true;
      guessButton.style.display = "none";
      restartButton.style.display = "inline";
      chancesNumber.textContent = "0";

      let loseSound = document.getElementById("loseSound");
      loseSound.play();
    }
  }
});

document.getElementById("restartButton").addEventListener("click", function() {
  difficultyContainer.style.display = "block";
  gameContainer.style.display = "none";
  startButton.disabled = true;
});

//pengubah