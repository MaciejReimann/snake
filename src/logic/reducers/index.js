const combineReducers = require("../helpers/combineReducers");
const loopReducer = require("./loopReducer");
const snakeReducer = require("./snakeReducer");
const viewReducer = require("./viewReducer");

module.exports = combineReducers({
  loopReducer,
  snakeReducer,
  viewReducer
});
