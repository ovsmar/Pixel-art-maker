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