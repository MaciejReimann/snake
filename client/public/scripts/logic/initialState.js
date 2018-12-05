const { RIGHT } = require('./directions').directions

module.exports = {
    tempo: 500,
    increaseRate: .95,
    resolution: 20,
    directions: [ RIGHT ],
    snake: Array(4).fill()
        .map((_, i) => {return  {x: 4 - i, y: 1}   }),
    food: { x: 7, y: 1 },
    isOver: false,
    isStarted: false,
    isPaused: false,
    score: 0
};