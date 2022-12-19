const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const colorPicker = document.getElementById("color-picker");
const colorBG = document.getElementById("color-BG");
const clearButton = document.getElementById("clear-button");
const eraserButton = document.getElementById("eraser-button");
const saveButton = document.getElementById("save-button");
const randomColorButton = document.getElementById("random-color-button");
const drawButton = document.getElementById("draw-button");
const stopButton = document.getElementById("stop-draw-button");
const strPixel = document.getElementById("quantityPixel");
let fileInput = document.getElementById("myFileInput");
let isDrawing = false;

// Function for drawing the grid cells on background
function drawGrid() {
    // Set the stroke style and line width
    context.strokeStyle = "#cccccc";
    context.lineWidth = 1;

    // Calculate the size of the grid cells based on the pixel size
    const gridSize = 10;

    // Iterate over the canvas width and height, drawing vertical and horizontal lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        context.beginPath();
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, canvas.height);
        context.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y + 0.5);
        context.lineTo(canvas.width, y + 0.5);
        context.stroke();
    }
}
// call function
drawGrid();


// function draws a pixel on a canvas at a specified x and y coordinate, with the pixel being snapped to a grid of a certain size.
function drawPixel(x, y) {
    const gridSize = 10;
    const snappedX = Math.floor(x / gridSize) * gridSize;
    const snappedY = Math.floor(y / gridSize) * gridSize;
    context.fillRect(snappedX, snappedY, gridSize, gridSize);
}


// Adds an event listener to a canvas element for mouse clicks, enabling drawing on the canvas.
canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    drawPixel(event.offsetX, event.offsetY);
});


//Adds an event listener to a canvas element for mouse movement, enabling continuous drawing on the canvas while the mouse button is held down
canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        drawPixel(event.offsetX, event.offsetY);
    }
});

// Adds an event listener to a canvas element for mouse button release, stopping drawing on the canvas.
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});


// Adds an event listener to a color picker element for value changes, allowing the user to change the drawing color on a canvas.
colorPicker.addEventListener("input", (event) => {
    context.fillStyle = event.target.value;
});


// Adds an event listener to a color picker element for value changes, allowing the user to change the background color of a canvas and storing the selected color in the browser's local storage.
colorBG.addEventListener("input", (event) => {
    canvas.style.backgroundColor = event.target.value;
    localStorage.setItem("bgColor", event.target.value);
});


// Adds an event listener to the page load event, setting the canvas background color to a stored value and updating a color picker element to match.
window.addEventListener("load", () => {
    const bgColor = localStorage.getItem("bgColor");
    if (bgColor) {
        colorBG.value = bgColor;
        canvas.style.backgroundColor = bgColor;
    }
});


// Adds an event listener to a button element for clicks, clearing the canvas, reloading the webpage, and redrawing a grid on the canvas.
clearButton.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.location.reload();
    drawGrid();
});

// Adds event listeners to a button and a canvas element for clicks and mouse movement, enabling an eraser tool for the canvas and redrawing a grid on the canvas.
eraserButton.addEventListener("click", () => {
    context.fillStyle = "#ffffff";
});

canvas.addEventListener("mousemove", (event) => {
    drawGrid();
});

// Storing the current drawing on the canvas as a data URL in the browser's local storage.
window.addEventListener("unload", () => {
    localStorage.setItem("drawing", canvas.toDataURL());
});

// Retrieves the stored drawing from the browser's local storage
window.addEventListener("load", () => {
    const dataURL = localStorage.getItem("drawing");
    if (dataURL) {
        const image = new Image();
        image.src = dataURL;
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }
});

// Adds an event listener to a button element for clicks, allowing the user to save their drawing on a canvas as a PNG image file by downloading the image data.
saveButton.addEventListener("click", () => {
    const image = document.createElement("img");
    image.src = canvas.toDataURL("image/png");

    window.open(
        image.src.replace(/^data:image\/[^;]/, "data:application/octet-stream")
    );
});


// Dreawing with random colors 
randomColorButton.addEventListener("click", () => {
    canvas.addEventListener("mousedown", (event) => {
        // Generate a random color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        // Set the fill style to the random color
        context.fillStyle = randomColor;

        // Draw a pixel at the clicked position
        drawPixel(event.offsetX, event.offsetY);
    });
});


// AUTO DRAWING
function draw() {
    // Generate a random color
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // Set the fill style to the random color
    context.fillStyle = randomColor;
    i = 0;
    // Draw ? pixels in a row
    for (let i = 0; i < strPixel.value; i++) {
        // Generate random coordinates for the pixel
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        // Draw the pixel at the random coordinates
        drawPixel(x, y);
    }
}


// If input(strPixel) of Pixel not empty then run setInterval ,else alert message
let intervalId;
drawButton.addEventListener("click", () => {
    if (strPixel.value.length == 0) {
        alert("Pixel input is empty , Quantity (between 1 and 1000)");
    } else {
        intervalId = setInterval(draw, 100);
    }
});

// stop AUTO DRAWING , cleaing clearInterval
stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
});