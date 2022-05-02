function makeCanvas(pixelSize) {
    const canvasDisplay = document.querySelector(".canvasContainer");
    canvasDisplay.style.gridTemplateRows = `repeat(${pixelSize}, 1fr)`;
    canvasDisplay.style.gridTemplateColumns = `repeat(${pixelSize}, 1fr)`;

    let canvasSize = pixelSize * pixelSize;
    for (let i = 0; i < canvasSize; i++) {
        const pixel = document.createElement("div");
        pixel.style.border = "1px solid grey";
        canvasDisplay.insertAdjacentElement("beforeend", pixel);
    }
}

makeCanvas(12)