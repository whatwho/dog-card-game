export const imgPath = "../images/kutyas/kepek_jpg/";
export const descPath = "../images/kutyas/text_jpg/";

const images = readImgToList(imgPath);
const descriptions = readImgToList(descPath);
const leftCardContainer = document.getElementById("left-cards-conatiner");
const rightCardContainer = document.getElementById("right-cards-conatiner");

document.getElementById("restart").addEventListener("click", () => window.location.reload());

function readImgToList(path) {
    let array = [];
    for (let i = 1; i < 21; i++) {
        let image = new Image();
        image.src = path + i + ".jpg";
        array.push(image);
    }
    return array;
}

let randomNumbers = [];

for (let index = 0; index < 8; index++) {
    let currentNum = Math.floor(Math.random() * 20);
    while (randomNumbers.includes(currentNum)) {
        currentNum = Math.floor(Math.random() * 20);
    }
    randomNumbers.push(currentNum);
    images[currentNum].setAttribute("number", currentNum);
    images[currentNum].classList.add("cards");
    leftCardContainer.append(images[currentNum]);
}

randomNumbers = randomNumbers.sort(() => Math.random() - 0.5)

randomNumbers.forEach(num => {
    descriptions[num].setAttribute("number", num);
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

function dragDrop(e) {
    e.preventDefault();
    this.classList.remove("hovered");
    const draggable = document.getElementsByClassName("dragging");
    console.log(draggable[0].getAttribute('number'));
    console.log(this.getAttribute('number'));
    if (draggable[0].getAttribute('number') === this.getAttribute('number')) {
        const pairsContainer = document.getElementById('pair-container');
        const newDiv = document.createElement('div');
        newDiv.classList.add('pairs');
        this.classList.add('first-pair-card');
        this.classList.remove('cards');
        newDiv.append(this);
        draggable[0].classList.add('second-pair-card');
        draggable[0].classList.remove('cards');
        newDiv.append(draggable[0]);
        pairsContainer.append(newDiv);
    }
}