const btnChangeSize = document.querySelector(".newSize"); // Button to change size
const canvasSizeInput = document.querySelector(".canvasSizeInput"); // Gets the text input
const messageAlert = document.querySelector("#alertMessage");
const colorPickerInput = document.querySelector(".colorPickerInput"); // Color picker input
const btnGridShow = document.querySelector(".showGridBtn"); 
const brushBtn = document.querySelector(".brushBtn"); // select the brush button
const rainbowBtn = document.querySelector(".rainbowBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const btnAll = document.querySelectorAll(".toolsContainer > img"); // selects all tools buttons 

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
        btnGridShow.addEventListener("click", () => pixel.classList.toggle("gridBorder"));
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
        messageAlert.textContent = "Size must be a number between 2 and 64. Try again!";
    };
};

btnChangeSize.addEventListener("mousedown", changeCanvasSize);

// Cleans the alert from the invalid input
window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || canvasSizeInput.value !== "") return messageAlert.textContent = "";
});

function paintPixel(e) {
    if (brushBtn.classList.contains("selected")) {
        let color = colorPickerInput.value; // Grabs the color from the color picker
        e.target.style.backgroundColor = `${color}`;
    } else if (rainbowBtn.classList.contains("selected")) {
        let colorR = Math.floor(Math.random() * 256);
        let colorG = Math.floor(Math.random() * 256);
        let colorB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${colorR}, ${colorG}, ${colorB})`;
    } else if (eraserBtn.classList.contains("selected")) {
        e.target.style.backgroundColor = "white";
    };
};

clearBtn.addEventListener("click", () => {
    const canvasDisplay = document.querySelector(".canvasContainer");
    const pixel = document.querySelectorAll(".canvasContainer > div");
    pixel.forEach(pixels => pixels.style.backgroundColor = "white");
});

// Selects the brush button and adds the background color
brushBtn.classList.add("selected");

// This changes the background color of the tools buttons when selected
// It first removes the class selected from all buttons and then adds it to the selected button
btnAll.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Removes the class selected from the brush button
        brushBtn.classList.remove("selected");
        // Remove the class selected from all the buttons
        btnAll.forEach(button => button.classList.remove("selected"));
        e.target.classList.toggle("selected");
    });
});