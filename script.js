import {
    drawBody,
    drawHead,
    drawInitialStructure,
    drawLeftArm,
    drawLeftLeg,
    drawRightArm,
    drawRightLeg,
} from "./canvas.js";
import { categories, alphabetLetters } from "./words.js";

const categoryContainer = document.getElementById("category-container");
const hiddenWord = document.getElementById("hidden-word");
const alphabetContainer = document.getElementById("alphabet-container");
const newGamePopup = document.querySelector(".new-game-popup");
const newGameButton = document.getElementById("new-game-button");

let chosenWord;
let lettersGuessed = 0;
let incorrectGuessesCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", newGame);
});

const displayCategories = () => {
    Object.keys(categories).forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectCategory(category));
        categoryContainer.appendChild(button);
    });
};

const selectCategory = (selectedCategory) => {
    document.querySelectorAll(".category").forEach((button) => {
        if (selectedCategory === button.textContent.toLowerCase()) {
            button.classList.add("active");
        } else {
            button.disabled = true;
        }
    });

    if (!chosenWord) {
        const wordsArray = categories[selectedCategory];
        const randomNumber = Math.floor(Math.random() * wordsArray.length);
        chosenWord = wordsArray[randomNumber];
        console.log(chosenWord);
    }
    hiddenWord.textContent = "";
    hiddenWord.classList.add("active");
    alphabetContainer.classList.add("active");
    hiddenWord.innerHTML = chosenWord
        .split("")
        .map(() => '<span class="dashes">-</span>')
        .join("");
};

const createAlphabetButtons = () => {
    const alphabet = alphabetLetters.split("");
    alphabet.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        button.addEventListener("click", selectLetter);
        alphabetContainer.appendChild(button);
    });
};

const selectLetter = (e) => {
    const selectedLetter = e.target.textContent;
    const chosenWordArray = chosenWord.toLowerCase().split("");
    if (chosenWordArray.includes(selectedLetter.toLowerCase())) {
        revealLetter(chosenWordArray, selectedLetter.toLowerCase());
        if (chosenWordArray.length === lettersGuessed) {
            displayResult(true);
        }
    } else {
        incorrectGuessesCount++;
        drawMan();
        if (incorrectGuessesCount === 6) {
            displayResult(false);
        }
    }
    e.target.disabled = true;
};

const revealLetter = (chosenWordArray, selectedLetter) => {
    const dashes = document.querySelectorAll(".dashes");
    chosenWordArray.forEach((letter, index) => {
        if (selectedLetter === letter) {
            dashes[index].textContent = selectedLetter;
            lettersGuessed++;
        }
    });
};

const drawMan = () => {
    const drawFunctions = [
        drawHead,
        drawBody,
        drawLeftArm,
        drawRightArm,
        drawLeftLeg,
        drawRightLeg,
    ];

    if (incorrectGuessesCount <= 6) {
        drawFunctions[incorrectGuessesCount - 1]();
    }
};

const displayResult = (isWin) => {
    const h2 = document.querySelector("#result-container h2");
    h2.textContent = isWin ? "You Win" : "You Lose";

    const p = document.querySelector("#result-container p");
    p.textContent = `The chose word was ${chosenWord}`;
    setTimeout(() => newGamePopup.classList.add("active"), 500);
    alphabetContainer.style.pointerEvents = "none";
};

const newGame = () => {
    incorrectGuessesCount = 0;
    chosenWord = "";
    lettersGuessed = 0;
    hiddenWord.textContent = "";
    hiddenWord.classList.remove("active");

    alphabetContainer.innerHTML = "";
    alphabetContainer.classList.remove("active");
    alphabetContainer.style.pointerEvents = "all";

    categoryContainer.innerHTML = "";

    newGamePopup.classList.remove("active");

    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
};
