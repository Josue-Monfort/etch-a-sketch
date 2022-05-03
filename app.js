const btnChangeSize = document.querySelector(".newSize"); // Button to change size
const canvasSizeInput = document.querySelector(".canvasSizeInput"); // Gets the text input
const messageAlert = document.querySelector("#alertMessage");
const colorPickerInput = document.querySelector(".colorPickerInput"); // Color picker input

function makeCanvas(pixelSize) {
    const canvasDisplay = document.querySelector(".canvasContainer");
    const pixel = document.querySelectorAll(".canvasContainer > div"); // Only selects the divs inside the canvas container
    pixel.forEach(pixels => pixels.remove()); // Prevents the canvas to be populated by "invicible" divs
    canvasDisplay.style.gridTemplateRows = `repeat(${pixelSize}, 1fr)`;
    canvasDisplay.style.gridTemplateColumns = `repeat(${pixelSize}, 1fr)`;

    let canvasSize = pixelSize * pixelSize;
    // Populates the canvas container with divs
    for (let i = 0; i < canvasSize; i++) {
        let pixel = document.createElement("div");
        pixel.addEventListener("mouseover", paintPixel); // changes the background color of the div when mouse hover
        pixel.style.border = "1px solid grey"; // TODO CHANGE LOCATION
        canvasDisplay.insertAdjacentElement("beforeend", pixel);
    };
};

makeCanvas(16);

// Catch the canvas size input from the user and changes the canvas size using that input
function changeCanvasSize(size) {
    size = canvasSizeInput.value;
    // Limits the user to input only numbers between 2 and 64
    if (size >= 2 && size <= 64) {
        return makeCanvas(size);
    } else {
        // Fires an alert if the user input is not a valid input
        messageAlert.textContent = "Size must be a number between 2 and 64. Try again!"
    };
};

btnChangeSize.addEventListener("click", changeCanvasSize);

// Cleans the alert from the invalid input
window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || canvasSizeInput.value !== "") return messageAlert.textContent = "";
});

function paintPixel(e) {
    let color = colorPickerInput.value; // Grabs the color from the color picker
    e.target.style.backgroundColor = `${color}`;
};