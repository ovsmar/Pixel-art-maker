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
let isRandomColorActive = true;

// the canvas' current width/height.
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;



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
// call function drawGrid()
drawGrid();

// function for canvas auto-resize 
function windowResize() {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);  // Store the image data
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.putImageData(imageData, 0, 0);  // Restore the image data
    drawGrid();  // Call the drawGrid function to redraw the grid on top of the image data
};

window.addEventListener('resize', windowResize)


// function draws a pixel on a canvas at a specified x and y coordinate, with the pixel being snapped to a grid of a certain size.
function drawPixel(x, y) {
    const gridSize = 10;
    const snappedX = Math.floor(x / gridSize) * gridSize;
    const snappedY = Math.floor(y / gridSize) * gridSize;
    context.fillRect(snappedX, snappedY, gridSize, gridSize);
}


// The ghost of pixel cell
const ghostCanvas = document.createElement("canvas");
ghostCanvas.width = 10;
ghostCanvas.height = 10;
const ghostContext = ghostCanvas.getContext("2d");

const ghostImage = document.createElement("img");
ghostImage.style.position = "absolute";
ghostImage.style.zIndex = "10000";
ghostImage.style.pointerEvents = "none";
document.body.appendChild(ghostImage);

canvas.addEventListener("mousemove", (event) => {
    const x = Math.floor(event.offsetX / 10) * 10;
    const y = Math.floor(event.offsetY / 10) * 10;

    if (isRandomColorActive) {
        context.fillStyle = DrawRandomColors();
    } else {
        context.fillStyle = colorPicker.value;

    }
    // color of ghost pixel
    ghostContext.fillStyle = "#cccccc";

    ghostContext.fillRect(0, 0, 10, 10);
    ghostImage.src = ghostCanvas.toDataURL();
    ghostImage.style.left = `${event.clientX + -4}px`;
    ghostImage.style.top = `${event.clientY + -4}px`;
});

canvas.addEventListener("mousedown", (event) => {
    const x = Math.floor(event.offsetX / 10) * 10;
    const y = Math.floor(event.offsetY / 10) * 10;

    if (isRandomColorActive) {
        context.fillStyle = DrawRandomColors();
    } else {
        context.fillStyle = colorPicker.value;
    }
    context.fillRect(x, y, 10, 10);
});


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


//EraserButton
// Adds event listeners to a button and a canvas element for clicks and mouse movement, enabling an eraser tool for the canvas and redrawing a grid on the canvas.
let isErasing = false;

eraserButton.addEventListener("click", () => {
    isErasing = !isErasing;
    if (!isErasing) {
        context.fillStyle = "#000";
        eraserButton.style.backgroundColor = "red"
    } else {
        eraserButton.style.backgroundColor = "green"
    }
});

canvas.addEventListener("mousedown", (event) => {
    if (isErasing) {
        context.fillStyle = "transparent";
        const x = Math.floor(event.offsetX / 10) * 10;
        const y = Math.floor(event.offsetY / 10) * 10;

        // Clear a 10x10 pixel area at the current mouse position
        context.clearRect(x, y, 10, 10);
    } else {
        if (isRandomColorActive) {
            context.fillStyle = DrawRandomColors();
        } else {
            context.fillStyle = colorPicker.value;
        }
        const x = Math.floor(event.offsetX / 10) * 10;
        const y = Math.floor(event.offsetY / 10) * 10;
        context.fillRect(x, y, 10, 10);
    }
});

canvas.addEventListener("mousemove", (event) => {
    if (isErasing) {
        context.fillStyle = "transparent";
        const x = Math.floor(event.offsetX / 10) * 10;
        const y = Math.floor(event.offsetY / 10) * 10;

        // Clear a 10x10 pixel area at the current mouse position
        context.clearRect(x, y, 10, 10);
    }
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
    // Create a temporary canvas to draw the image on
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempContext = tempCanvas.getContext("2d");
    const bgColorSAVE = localStorage.getItem("bgColor");
    // Set the canvas background color with the background color from localStorage

    if (bgColorSAVE === null) {
        tempContext.fillStyle = "#ffffff";
    } else {
        tempContext.fillStyle = bgColorSAVE;
    }
    tempContext.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the current canvas image onto the temporary canvas
    tempContext.drawImage(canvas, 0, 0);

    // Create an a element to download the image
    const link = document.createElement("a");
    link.download = "pixel.png";  // Set the download attribute to the desired file name
    link.href = tempCanvas.toDataURL("image/png");  // Set the href attribute to the image data
    document.body.appendChild(link);  // Add the a element to the body
    link.click();  // Click the a element to trigger the download
    document.body.removeChild(link);  // Remove the a element from the body
});


// function for Generate a random color
function generateRandomColor() {
    const randomNumber = Math.floor(Math.random() * 16777215);
    return `#${randomNumber.toString(16)}`;
}

// Draawing with random colors 
// Flag to track whether the random color button is active
function DrawRandomColors() {


    // Update the value of the flag and the fill style of the canvas context when the button is clicked
    randomColorButton.addEventListener("click", () => {

        if (isRandomColorActive) {
            // Generate a random color
            // const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

            // Set the fill style to the random color
            context.fillStyle = generateRandomColor();
            return generateRandomColor()

        } else {
            // Set the fill style to the current color picker value
            context.fillStyle = colorPicker.value;
        }
    });

    // Add a single event listener for the "mousedown" event
    canvas.addEventListener("mousedown", (event) => {
        // Draw a pixel at the clicked position
        drawPixel(event.offsetX, event.offsetY);
    });

}
// AUTO DRAWING
function draw() {
    // Generate a random color


    // Set the fill style to the random color
    context.fillStyle = generateRandomColor();
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
        alert("Pixel input is empty");
    } else {
        intervalId = setInterval(draw, 100);
    }
});

// Stop AUTO DRAWING , cleaning clearInterval
stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
});


//Pixel art from an image
function createPixelArt(image, canvas, gridSize) {
    // Get the canvas context
    const context = canvas.getContext("2d");

    // Set the width and height of the canvas to match the image size
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image on the canvas
    context.drawImage(image, 0, 0);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Iterate over every pixel in the image data
    for (let y = 0; y < imageData.height; y += gridSize) {
        for (let x = 0; x < imageData.width; x += gridSize) {
            // Get the pixel color at the current position
            const pixelColor = getPixelColor(imageData, x, y);

            // Draw a pixel with the pixel color at the current position
            context.fillStyle = pixelColor;
            context.fillRect(x, y, gridSize, gridSize);
        }
    }
    drawGrid();
}


// Get the pixels from the image
function getPixelColor(imageData, x, y) {
    // Calculate the index of the pixel in the image data array
    const index = (x + y * imageData.width) * 4;

    // Extract the red, green, blue, and alpha values from the image data
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const a = imageData.data[index + 3];

    // Return the pixel color as a string in the format "rgba(r, g, b, a)"
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// When the user selects a file, set the value of the input element
fileInput.onchange = function () {
    // Get the selected files
    let files = fileInput.files;

    // Get the first file in the list
    let file = files[0];

    let objectURL = URL.createObjectURL(file);

    const image = new Image();
    image.src = objectURL;

    image.onload = function () {
        createPixelArt(image, canvas, 1);
    };

};


//Letters/numbers to pixel
let canvasDrawnOn = false;

const form = document.getElementById("pixel-art-form");
const colorLN = document.getElementById("color-picker-LN");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.getElementById("text-input").value;

    // Check if the input value is empty
    if (!input) {
        alert("Please enter some text or numbers");
        return;
    }

    if (canvasDrawnOn) {
        // Clear the canvas if second click
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


    context.fillStyle = colorLN.value;
    const fontSize = 100;
    const textWidth = context.measureText(input).width;
    const x = (canvas.width - textWidth) / 4;
    const y = (canvas.height - fontSize) / 4 + fontSize;


    context.font = `${fontSize}px RubikSprayPaint-Regular`;
    context.fillText(input, x, y);

    canvasDrawnOn = true;
});

