import {gameEvents} from "./game.js";
import { descriptions, images, descriptionsWithoutText } from "./readImg.js";
import {getPlayTime} from "./time.js";

window.onload = function () {
    init();
}

function init() {
    const level = getLevel();
    setUpTimeDiv(level);
    document.getElementById("restart").addEventListener("click", () => window.location.reload());
    buildGame();
    gameEvents(level);
}

function getLevel() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('level');
}

function setUpTimeDiv(level) {
    let timeDiv = document.getElementById('time');
    console.log(timeDiv)
    if (level === 'hard') {
        timeDiv.style.visibility = "visible";
        getPlayTime.start_time();
    }
}

function buildGame() {
    const leftCardContainer = document.getElementById("left-cards-container");
    const rightCardContainer = document.getElementById("right-cards-container");
    let randomNumbers = [];

    for (let index = 0; index < 8; index++) {
        let currentNum = Math.floor(Math.random() * 20);
        while (randomNumbers.includes(currentNum)) {
            currentNum = Math.floor(Math.random() * 20);
        }
        randomNumbers.push(currentNum);
        images[currentNum].setAttribute("number", currentNum);
        images[currentNum].setAttribute("imgNum", 1);
        images[currentNum].classList.add("cards");
        leftCardContainer.append(images[currentNum]);
    }

    randomNumbers = randomNumbers.sort(() => Math.random() - 0.5)

    const level = getLevel();

    if (level === "hard" || level === 'middle') {
        randomNumbers.forEach(num => {
            descriptionsWithoutText[num].setAttribute("number", num);
            descriptionsWithoutText[num].setAttribute("imgNum", 0);
            descriptionsWithoutText[num].classList.add("cards");
            rightCardContainer.append(descriptionsWithoutText[num])
        });
    } else {
        randomNumbers.forEach(num => {
            descriptions[num].setAttribute("number", num);
            descriptions[num].setAttribute("imgNum", 0);
            descriptions[num].classList.add("cards");
            rightCardContainer.append(descriptions[num])
        });
    }

    
}




