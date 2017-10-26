import {initialState, gameData} from '../data.js';
import getScore from './score.js';

const getResult = () => {
  let time = 0;
  let answers = 0;
  gameData.stat.forEach((it) => {
    time += it.time;
    if (it.time < 30) {
      answers++;
    }
  });
  if (gameData.stat.length) {
    gameData.history.push(getScore(gameData.stat, initialState.notes));
  }
  gameData.history.sort((a, b) => {
    return b - a;
  });
  const success = (gameData.history.length - (gameData.history.indexOf(getScore(gameData.stat, initialState.notes)) + 1)) / gameData.history.length * 100;
  const place = gameData.history.indexOf(getScore(gameData.stat, initialState.notes)) + 1;
  return {
    totalTime: time,
    fastAnswers: answers,
    successPercent: Math.floor(success),
    currentPlace: place
  };
};

export default getResult;
