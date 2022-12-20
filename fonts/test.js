// turn on/off the grid
const gridButton = document.getElementById("toggle-grid-button");
function toggleGrid() {
    // Check if the grid is currently visible
    const gridVisible = localStorage.getItem("gridVisible") === "true";
    // Toggle the grid visibility
    localStorage.setItem("gridVisible", !gridVisible);
    // Redraw the canvas with the updated grid visibility
    drawCanvas();
  }
  
  function drawCanvas() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Check if the grid is set to be visible
    if (localStorage.getItem("gridVisible") === "true") {
      // Draw the grid
      drawGrid();
    }
  }
  
  // Add an event listener to the button to toggle the grid when clicked
  const toggleButton = document.getElementById("toggle-grid-button");
  toggleButton.addEventListener("click", toggleGrid);
  
  // Set the initial grid visibility state when the page loads
  window.addEventListener("load", () => {
    
    // Check if the grid visibility has been previously saved in local storage
    const gridVisible = localStorage.getItem("gridVisible");
    if (gridVisible) {
      // Use the saved grid visibility state
      drawCanvas();
    } else {
      // Set the default grid visibility to true
      localStorage.setItem("gridVisible", true);
      drawCanvas();
    }
  });






  canvas.addEventListener("mousemove", (event) => {
    if (localStorage.getItem("gridVisible") === "true") {
      // Draw the grid
      drawGrid();
    }
});