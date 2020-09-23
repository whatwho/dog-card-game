import { gameEvents } from "./game.js";
import { images, descriptions } from "./readImg.js";


const leftCardContainer = document.getElementById("left-cards-conatiner");
const rightCardContainer = document.getElementById("right-cards-conatiner");

document.getElementById("restart").addEventListener("click", () => window.location.reload());

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

gameEvents();
