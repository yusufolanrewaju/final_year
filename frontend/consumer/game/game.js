let puzzlePieces = [];
let currentPuzzle = [];
let score = 100;
let attempts = 0;
let timeLeft = 80;
let timerInterval;
let selectedPiece = null;

// Puzzle data based on difficulty
const codeSnippets = {
  easy: ["let x = 5;", "if (x > 3) {", "console.log(x);", "}"],
  medium: ["const arr = [1, 2, 3];", "for (let i = 0; i < arr.length; i++) {", "console.log(arr[i]);", "}"],
  hard: ["function sum(a, b) {", "return a + b;", "}"],
};

// DOM elements
const aiText = document.getElementById("ai-text");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const puzzleContainer = document.getElementById("code-pieces");
const slotContainer = document.getElementById("slots");
const submitBtn = document.getElementById("submit-btn");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const retryBtn = document.getElementById("retry-btn");
const nextLevelBtn = document.getElementById("next-level-btn");

// Initialize game
function startGame() {
  displayAIMessage("Welcome! Click to select a code piece and then click on a slot to place it.");
  loadPuzzle("easy");
  startTimer();
  submitBtn.addEventListener("click", checkSolution);
  retryBtn.addEventListener("click", retryLevel);
  nextLevelBtn.addEventListener("click", loadNextLevel);
}

// Display AI Message with typing effect
function displayAIMessage(message) {
  aiText.innerHTML = "";
  let index = 0;
  const interval = setInterval(() => {
    aiText.innerHTML += message.charAt(index);
    index++;
    if (index === message.length) clearInterval(interval);
  }, 50);
}

// Load puzzle pieces based on difficulty
function loadPuzzle(difficulty) {
  puzzlePieces = [...codeSnippets[difficulty]];
  currentPuzzle = [...puzzlePieces]; // Clone for checking later
  shuffleArray(puzzlePieces);

  puzzleContainer.innerHTML = "";
  slotContainer.innerHTML = "";

  puzzlePieces.forEach((piece) => {
    const pieceElement = document.createElement("div");
    pieceElement.className = "piece";
    pieceElement.textContent = piece;
    pieceElement.addEventListener("click", onPieceClick);
    puzzleContainer.appendChild(pieceElement);

    const slotElement = document.createElement("div");
    slotElement.className = "slot";
    slotElement.addEventListener("click", onSlotClick);
    slotElement.dataset.filled = "false"; // Mark slot as empty
    slotContainer.appendChild(slotElement);
  });
}

// Timer functionality
function startTimer() {
  timeLeft = 80;
  timerElement.textContent = timeLeft;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult("Time's up! You failed.");
    }
  }, 1000);
}

// Click to select puzzle piece
function onPieceClick(event) {
  const pieceElements = document.querySelectorAll(".piece");
  pieceElements.forEach((el) => el.classList.remove("selected")); // Deselect other pieces
  selectedPiece = event.target;
  selectedPiece.classList.add("selected"); // Highlight selected piece
}

// Place the selected piece in a slot
function onSlotClick(event) {
  if (!selectedPiece) return; // No piece selected

  const slotElement = event.target;

  // Prevent placing multiple pieces in one slot
  if (slotElement.dataset.filled === "true") {
    alert("This slot already has a piece! Please remove it first.");
    return;
  }

  // Place piece in the slot
  slotElement.textContent = selectedPiece.textContent;
  slotElement.dataset.filled = "true"; // Mark the slot as filled

  // Return the selected piece back to the puzzle box
  selectedPiece.remove();
  selectedPiece = null; // Deselect after placing
}

// Check if solution is correct
function checkSolution() {
  const slots = document.querySelectorAll(".slot");
  let isCorrect = true;

  slots.forEach((slot, index) => {
    if (slot.textContent !== currentPuzzle[index]) {
      isCorrect = false;
    }
  });

  if (isCorrect) {
    showResult("Success! You passed the level.");
  } else {
    attempts++;
    score = Math.max(50, score - 10);
    scoreElement.textContent = score;

    if (attempts >= 5) {
      displayAIMessage("You've failed 5 times. Here’s the correct solution. Try again for no rewards.");
      displaySolution();
    }
  }
}

// Show result and update UI
function showResult(message) {
  clearInterval(timerInterval);
  resultMessage.textContent = message;
  resultScreen.classList.remove("hidden");
}

// Retry level
function retryLevel() {
  resultScreen.classList.add("hidden");
  loadPuzzle("easy"); // Retry with same difficulty
  startTimer();
  attempts = 0;
}

// Display the correct solution after five failed attempts
function displaySolution() {
  const slots = document.querySelectorAll(".slot");
  slots.forEach((slot, index) => {
    slot.textContent = currentPuzzle[index];
  });
}

// Load next level
function loadNextLevel() {
  resultScreen.classList.add("hidden");
  loadPuzzle("medium"); // Increase difficulty
  startTimer();
  score = 100;
  attempts = 0;
  scoreElement.textContent = score;
}

// Shuffle array utility function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start the game on page load
startGame();
