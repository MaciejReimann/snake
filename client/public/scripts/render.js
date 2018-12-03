const { getState } = require('./store');
const { 
    clear,
    drawRectangularGrid, 
    drawSquareFromCorner,
    drawCircle 
} = require('./helpers/renderHelpers');
const { 
    snakeColor,
    foodColor,
    gridColor,
    gameOverColor
} = require('./view/colorPalette').darkViolet;

function renderCanvas() {
    const { snake, food, resolution } = getState();
    const CANVAS = document.querySelector(".canvas");
    clear(CANVAS);
    // draw snake
    snake.forEach(square => drawSquareFromCorner(CANVAS, resolution, snakeColor, square));
    // draw food
    drawCircle(CANVAS, resolution, foodColor, food);
    // draw grid
    drawRectangularGrid(CANVAS, resolution, gridColor, .5);
};

function updateOptions() {
    document.querySelector(".options").textContent = 'GitHub';
}

function updateMessage() {
    const { isStarted, isPaused, isOver } = getState();
    let message;
    if (isOver) {
        message = 'Game is over <br> To restart press q';
    } else if(!isStarted) {
        message = 'To start press spacebar';
    } else if(isStarted && isPaused) {
        message = 'To resume press spacebar';
    } else {
        message = 'To pause press spacebar. To restart press q';
    };

    document.querySelector(".message").textContent = message;
};

function updateScore() {
    document.querySelector(".score").textContent = getState().score || 0;
};

function render() {
    renderCanvas();
    updateOptions();
    updateMessage();
    updateScore();
};

module.exports = {
    render
};
