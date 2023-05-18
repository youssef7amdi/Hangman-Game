// Letters
const letters = "abcdefghijklmnopqrstuvwxyz",
  lettersArr = [...letters],
  lettersDiv = document.getElementById("letters");

function generateLetters(arr) {
  for (let i = 0; i < arr.length; i++) {
    let letter = document.createElement("span");
    letter.innerHTML = arr[i];
    letter.className = "letter";
    letter.setAttribute("data-type", arr[i]);
    lettersDiv.appendChild(letter);
  }
}

generateLetters(lettersArr);

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "python",
    "reactjs",
    "pugjs",
  ],
  medicine: [
    "physiology",
    "anatomy",
    "internal medicine",
    "surgery",
    "histology",
    "ophthalmology",
  ],
  countries: ["egypt", "palestine", "yemen", "syria", "qatar"],
  ["famous People"]: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Sara",
    "Youssef",
  ],
};

function setRandomNumber(arr) {
  return Math.floor(Math.random() * arr.length);
}

const allKeys = Object.keys(words),
  randomPropName = allKeys[setRandomNumber(allKeys)],
  randomPropValue = words[randomPropName],
  randomValueName = randomPropValue[setRandomNumber(randomPropValue)];

const categorySpan = document.querySelector(".category span"),
  categoryText = document.createTextNode(randomPropName);

categorySpan.appendChild(categoryText);

// Letters Guess
const lettersGuess = document.getElementById("letters-guess"),
  lettersAndSpace = [...randomValueName];

lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") emptySpan.className = "has-space";
  lettersGuess.appendChild(emptySpan);
});

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  if (e.target.className === "letter") {
    addClassClicked(e.target);
    let theStatus = false;
    let theCLickedLetter = e.target.innerHTML.toLowerCase();
    lettersAndSpace.forEach((wordLetter, index) => {
      if (theCLickedLetter == wordLetter.toLowerCase()) {
        theStatus = true;
        let allGuessSpans = document.querySelectorAll(".letters-guess span");
        allGuessSpans[index].innerHTML = theCLickedLetter;
        allGuessSpans[index].classList.add("added");
      }
    });
    hangman(theStatus);
    checkCorrectAnswer([...lettersGuess.querySelectorAll("*")]);
  }
});

// Handle the draw
let hangmanDraw = document.getElementById("hangman-draw");
let allDrawsDivs = [...hangmanDraw.querySelectorAll("*")];
let index = 0;
function hangman(status) {
  if (!status) {
    if (allDrawsDivs[index].classList.contains("the-man")) index++;
    allDrawsDivs[index].classList.add("wrong");
    index++;
  }
  if (index === allDrawsDivs.length) {
    gameOver();
  }
}

function gameOver() {
  document.querySelectorAll(".letters .letter").forEach((letter) => {
    addClassClicked(letter);
  });
  let statusAll = false;
  landingPageBuilding(randomValueName, statusAll);
}
function addClassClicked(element) {
  if (!element.classList.contains("clicked")) element.classList.add("clicked");
}

function landingPageBuilding(chosenWord, status) {
  let landingPage = document.createElement("div"),
    landingContainer = document.createElement("div");
  landingPage.className = "landing-page";
  landingContainer.className = "landing-container";
  if (status) {
    let successSpan = document.createElement("span"),
      successText = document.createTextNode("Excellent!");
    successSpan.appendChild(successText);
    successSpan.className = "success";
    let spanText = document.createElement("span");
    spanText.innerHTML = `The Word Is <span>"${chosenWord}"</span>`;
    landingContainer.appendChild(successSpan);
    landingContainer.appendChild(spanText);
  } else {
    let failSpan = document.createElement("span"),
      failSpanText = document.createTextNode("Game Over");
    failSpan.appendChild(failSpanText);
    failSpan.className = "fail";
    let spanText = document.createElement("span");
    spanText.innerHTML = `The Correct Word Is <span>"${chosenWord}"</span>`;
    landingContainer.appendChild(failSpan);
    landingContainer.appendChild(spanText);
  }
  let playAgainBtn = document.createElement("button");
  playAgainBtn.className = "play-again";
  playAgainBtn.innerHTML = "Play Again";
  landingContainer.appendChild(playAgainBtn);
  landingPage.appendChild(landingContainer);
  document.body.appendChild(landingPage);
}

function playAgain() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("play-again")) window.location.reload();
  });
}
playAgain();

// check if correct
function checkCorrectAnswer(arr) {
  let newArr = arr.filter(
    (e) => e.classList.contains("added") || e.classList.contains("has-space")
  );
  if (newArr.length === arr.length) {
    document.querySelectorAll(".letters .letter").forEach((letter) => {
      addClassClicked(letter);
    });
    let statusAll = true;
    landingPageBuilding(randomValueName, statusAll);
  }
}
