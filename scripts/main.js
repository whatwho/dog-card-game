import {printer} from "./game.js";
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

const cards = document.getElementsByClassName("cards");

for(const card of cards) {
    card.addEventListener('dragover', dragOver);
    card.addEventListener('dragenter', dragEnter);
    card.addEventListener('dragleave', dragLeave);
    card.addEventListener('dragstart', () => card.classList.add('dragging'));
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    card.addEventListener('drop', dragDrop);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("hovered");
}

function dragLeave() {
    this.classList.remove("hovered");
}

let pairCounter = 0;

function dragDrop(e) {
    e.preventDefault();
    this.classList.remove("hovered");
    const draggable = document.getElementsByClassName("dragging");
    if (draggable[0].getAttribute('number') === this.getAttribute('number') && draggable[0] !== this) {
        const pairsContainer = document.getElementById('pair-container');
        const newDiv = document.createElement('div');
        newDiv.classList.add('pairs');
        if (draggable[0].getAttribute('imgNum') == 1) {
            this.classList.add('first-pair-card');
            this.classList.remove('cards');
            newDiv.append(this);
            draggable[0].classList.add('second-pair-card');
            draggable[0].classList.remove('cards');
            newDiv.append(draggable[0]);
        } else {
            draggable[0].classList.add('first-pair-card');
            draggable[0].classList.remove('cards');
            newDiv.append(draggable[0]);
            this.classList.add('second-pair-card');
            this.classList.remove('cards');
            newDiv.append(this);
        }
        
        pairsContainer.append(newDiv);
        pairCounter++;
        if (pairCounter >= 8) {
            document.getElementById('hidden').style.display = "block";
            document.getElementById('middle-line').style.display = "none";
        }
    }
}
