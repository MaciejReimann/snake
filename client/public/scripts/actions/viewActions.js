const { dispatch, getState } = require('../store');
const {
    RESIZE_BOARD,
    CHANGE_RESOLUTION,
    ADD_CONTROLS
    } = require('../actions/constants');
const {
    enqueueTurn
} = require('../actions/snakeActions');
const {
    startGame,
    pauseGame    
} = require('../actions/loopActions');
const {
    createElement,
    resizeCanvas
} = require('../helpers/DOMHelpers')

const canvasContainer = document.querySelector(".canvas-container");
let CANVAS;

function resizeBoard() {
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    if(!CANVAS) {
        CANVAS = createElement('canvas');
        canvasContainer.appendChild(CANVAS);
    }
    resizeCanvas(CANVAS, width, height);
    const payload = {
        width,
        height,
    };
    return dispatch({
        type: RESIZE_BOARD,
        payload
    });
};

function addControls() {    

    function onMobile() {

        return dispatch({
            type: ADD_CONTROLS,
            deviceType: 'mobile'
        });
    };

    function onDesktop() {
        resizeBoard();
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'Enter': case ' ':  getState().isPaused ? startGame() : pauseGame(); break
                case 'w': case 'ArrowUp':    enqueueTurn('UP'); break
                case 'a': case 'ArrowLeft':  enqueueTurn('LEFT');  break
                case 's': case 'ArrowDown':  enqueueTurn('DOWN'); break
                case 'd': case 'ArrowRight': enqueueTurn('RIGHT');  break
            };
        });
        return dispatch({
            type: ADD_CONTROLS,
            deviceType: 'desktop'
        });
    };
    return document.body.clientWidth > 1024 ? onDesktop() : onMobile();
}

module.exports = {
    addControls,
    resizeBoard
}