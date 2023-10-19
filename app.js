const imgBoxes = document.querySelectorAll(".imgBox");
const whiteBoxes = document.querySelectorAll(".whiteBox");
const genBtn = document.getElementById('genElem');
const blackBox = document.querySelector('.blackBox');
let regenCount = 0;

function divGenerator() {
    
    genBtn.addEventListener('click', (e) => {
        const rand = Math.floor(Math.random() * 4)+1;
        if(regenCount > 3){
            return;
        }

        // Check if the black box already has an element inside
        if (blackBox.hasChildNodes()) {
            while (blackBox.firstChild) {
                blackBox.removeChild(blackBox.firstChild);
                regenCount+= 1
                console.log(regenCount)
            }
        } else {
            regenCount = 0;
        }
        const newBox = document.createElement('div');
        newBox.classList.add('imgBox', 'dragging');
        newBox.style.backgroundImage = `url("/images/albums/${rand}.jpg")`;
        newBox.setAttribute('draggable', true);
        blackBox.appendChild(newBox);


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
        regenCount = 0;
        const droppedBox = document.querySelector(".imgBox.dragging"); // Find the currently dragged box
        if (droppedBox) {
            container.appendChild(droppedBox);
            droppedBox.setAttribute('draggable', false); // Make the dropped box non-draggable
            droppedBox.classList.remove("dragging"); // Remove the "dragging" class
        }
    });
});
