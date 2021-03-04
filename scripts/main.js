import { gameEvents } from "./game.js";
import { images, descriptions } from "./readImg.js";
import { getPlayTime } from "./time.js";

window.onload = function () {
    init();
}

function init() {
    document.getElementById("restart").addEventListener("click", () => window.location.reload());
    buildGame();
    gameEvents();
    getPlayTime.start_time();
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

    randomNumbers.forEach(num => {
        descriptions[num].setAttribute("number", num);
        descriptions[num].setAttribute("imgNum", 0);
        descriptions[num].classList.add("cards");
        rightCardContainer.append(descriptions[num])
    });
}




