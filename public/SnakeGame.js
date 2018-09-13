// GAME LOGIC SINGLETON PRESERVING GAME STATE

const snakeGame = ( () => {
  'use strict'
  let gameInstance;

  // snake navigation
  const UP = { x: 0, y:-1 };
  const RIGHT = { x: 1, y: 0 };
  const DOWN = { x: 0, y: 1 };
  const LEFT = { x:-1, y: 0 };


  // initial game set-up
  const initialState = {
    lastTime: Date.now(),
    tempo: 1000,
    snakeDirections: [RIGHT],
    snakeBody: [
      {
        x: 1,
        y: 1
      }
    ],
    worm: {
      x: 5,
      y: 2
    },
  }

  // game conditionals
  const canGo = direction => state =>
    direction.x + state.snakeDirections.x !== 0 ||
    direction.y + state.snakeDirections.y !== 0


  // game actions
  const moveSnake = state => {
    let headMoved = [
      {
          x: state.snakeBody[0].x + state.snakeDirections[0].x,
          y: state.snakeBody[0].y + state.snakeDirections[0].y
      }
    ];

    state.snakeBody = state.snakeBody.slice(1);
    state.snakeBody = headMoved.concat(state.snakeBody);
    if (state.snakeDirections > 1) {
      state.snakeDirections = state.snakeDirections.slice(1, state.snakeDirections.length);
    }    
    return state;
  }

  const changeDirection = direction => state => {
    state.snakeDirections = state.snakeDirections.concat(direction);
    return state;
  }

  const timestamp = state => {
    state.lastTime = Date.now();
    return state;
  }

  const snakeReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'MOVE':
        return moveSnake(state);
      case 'GO-RIGHT':
        return changeDirection(RIGHT)(state);
      case 'GO-DOWN':
        return changeDirection(DOWN)(state);
      case 'GO-LEFT':
        return changeDirection(LEFT)(state);
      case 'GO-UP':
        return changeDirection(UP)(state);
      case 'TIMESTAMP':
        return timestamp(state);
      default:
        return state;
    }
  }

  return {
    getInstance: () => {
      if(!gameInstance) {
        gameInstance = createStore(snakeReducer);
      }
      return gameInstance;
    }
  }

})()
