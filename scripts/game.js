import { getPlayTime } from "./time.js";

export function gameEvents() {

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

            if (is_win(pairCounter)) {
                getPlayTime.stop_timer();
                won_screen();
            }
        } else {
            getPlayTime.increase_timer();
        }
    }

    function is_win(pairCounter) {
        return pairCounter >= 8;
    }
    function won_screen() {
        let temp_time = getPlayTime.getTime();
        document.getElementById('hidden').innerText = "Megtaláltad az összes párt!:)\nJátékidő: " + temp_time['minute'] + ":" + temp_time['second'];
        document.getElementById('hidden').style.display = "block";
        document.getElementById('middle-line').style.display = "none";
        document.getElementById('restart').style.top = "40%"
    }
}