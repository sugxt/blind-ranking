const imgBoxes = document.querySelectorAll(".imgBox");
const whiteBoxes = document.querySelectorAll(".whiteBox");
const genBtn = document.getElementById('genElem');
const blackBox = document.querySelector('.blackBox');

function divGenerator() {
    genBtn.addEventListener('click', () => {
        const rand = Math.floor(Math.random() * 4)+1;
        console.log(rand);
        const newBox = document.createElement('div');
        newBox.classList.add('imgBox', 'dragging');
        newBox.style.backgroundImage = `url("/images/albums/${rand}.jpg")`; // Add the 'imgBox' class and 'dragging' class to make it draggable
        newBox.setAttribute('draggable', true);
        blackBox.appendChild(newBox);

        // Add dragstart event listener for the newly generated div
        newBox.addEventListener('dragstart', (e) => {
            if (newBox.getAttribute('draggable') === "false") {
                e.preventDefault();
            }
        });
    });
}
divGenerator();

imgBoxes.forEach(box => {
    box.setAttribute('draggable', true);

    box.addEventListener('dragstart', (e) => {
        if (box.getAttribute('draggable') === "false") {
            e.preventDefault();
        } else {
            box.classList.add("dragging"); // Add a class to identify the currently dragged box
        }
    });
});

whiteBoxes.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        console.log("dragging over");
    });

    container.addEventListener("drop", (e) => {
        const droppedBox = document.querySelector(".imgBox.dragging"); // Find the currently dragged box
        if (droppedBox) {
            container.appendChild(droppedBox);
            droppedBox.setAttribute('draggable', false); // Make the dropped box non-draggable
            droppedBox.classList.remove("dragging"); // Remove the "dragging" class
        }
    });
});
