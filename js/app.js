let programmingLanguages = [
  "python",
  "javascript",
  "mongodb",
  "json",
  "java",
  "html",
  "css",
  "csharp",
  "golang",
  "kotlin",
  "php",
  "sql",
  "ruby",
];
let answer = "";
let mistakes = 0;
let maxWrongs = 6;
let guessed = [];
let wordStatus = null;
// randomword
function randomWord() {
  answer =
    programmingLanguages[
      Math.floor(Math.random() * programmingLanguages.length)
    ];
}
// generatebuttons
function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button id='` +
        letter +
        `' class="btn" onClick="handleGuess('` +
        letter +
        `')">` +
        letter +
        `</button>`
    )
    .join("");
  document.getElementById("keyboard").innerHTML = buttonsHTML;
}
// guessedWord
function guessedWord() {
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) > 0 ? letter : " _ "))
    .join("");
  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}
// handleGuess
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disabled", true);
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    checkIfGameLost();
    updateHangmanPicture();
    updateMistakes();
  }
}
// checkIfGameWon
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById("keyboard").innerHTML = "You Won!!!";
  }
}
// checkIfGameLost
function checkIfGameLost() {
  if (mistakes === maxWrongs) {
    document.getElementById("keyboard").innerHTML = "You Lost!!!";
    document.getElementById("wordSpotlight").innerHTML =
      "The answer is: " + answer;
  }
}
// updateHangmanPicture
function updateHangmanPicture() {
  document.getElementById("hangmanPic").src = "./images" + mistakes + ".jpg";
}
// updateMistakes
function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}
// reset
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById("hangmanPic").src = "./images/0.jpg";
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}
document.getElementById("maxWrongs").innerHTML = maxWrongs;
randomWord();
guessedWord();
generateButtons();
