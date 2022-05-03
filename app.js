const btnChangeSize = document.querySelector(".newSize"); // Button to change size
const canvasSizeInput = document.querySelector(".canvasSizeInput"); // Gets the text input
const messageAlert = document.querySelector("#alertMessage");
const colorPickerInput = document.querySelector(".colorPickerInput"); // Color picker input
const btnGridShow = document.querySelector(".showGridBtn"); 
const brushBtn = document.querySelector(".brushBtn"); // select the brush button
const btnAll = document.querySelectorAll("img") // selects all tools buttons 

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
        // pixel.style.border = "1px solid grey"; // TODO CHANGE LOCATION
        btnGridShow.addEventListener("click", () => pixel.classList.toggle("gridBorder"))
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

btnChangeSize.addEventListener("mousedown", changeCanvasSize);

// Cleans the alert from the invalid input
window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || canvasSizeInput.value !== "") return messageAlert.textContent = "";
});

function paintPixel(e) {
    let color = colorPickerInput.value; // Grabs the color from the color picker
    e.target.style.backgroundColor = `${color}`;
};

// Selects the brush button and adds the background color
brushBtn.classList.add("selected")

// This changes the background color of the tools buttons when selected
// It first removes the class selected from all buttons and then adds it to the selected button
btnAll.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Removes the class selected from the brush button
        brushBtn.classList.remove("selected")
        // Remove the class selected from all the buttons
        btnAll.forEach(button => button.classList.remove("selected"));
        e.target.classList.toggle("selected");
    });
});