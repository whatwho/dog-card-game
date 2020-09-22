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
    card.addEventListener('drop', dragDrap);
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

function dragDrap(e) {
    e.preventDefault();
    this.classList.remove("hovered");
}