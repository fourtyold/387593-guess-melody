import getElementFromTemplate from './element.js';
import mainReplayHandler from './replay.js';
import {initialState, gameData} from './data.js';
import getScore from './score.js';
import {showScreen} from './show-element.js';

const getResultTemplate = (resultObj) =>
  `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${Math.floor(resultObj.totalTime / 60)}&nbsp;минуты и ${resultObj.totalTime % 60}&nbsp;секунд
      <br>вы&nbsp;набрали ${getScore(gameData.stat, initialState.notes)} баллов (${resultObj.fastAnswers} быстрых)
      <br>совершив ${3 - initialState.notes} ошибки</div>
    <span class="main-comparison">Вы заняли ${resultObj.currentPlace} место из ${gameData.history.length}. Это&nbsp;лучше чем у&nbsp;${resultObj.successPercent}%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>`;

const getResult = () => {
  let time = 0;
  let answers = 0;
  gameData.stat.forEach((it) => {
    time += it.time;
    if (it.time < 30) {
      answers++;
    }
  });
  gameData.history.push(getScore(gameData.stat, initialState.notes));
  gameData.history.sort((a, b) => {
    return b - a;
  });
  const success = (gameData.history.length - (gameData.history.indexOf(getScore(gameData.stat, initialState.notes)) + 1)) / gameData.history.length * 100;
  const place = gameData.history.indexOf(getScore(gameData.stat, initialState.notes)) + 1;
  return {
    totalTime: time,
    fastAnswers: answers,
    successPercent: success,
    currentPlace: place
  };
};

const showResultScreen = () => {
  const resultElement = getElementFromTemplate(getResultTemplate(getResult()));
  const mainReplay = resultElement.querySelector(`.main-replay`);
  mainReplay.addEventListener(`click`, mainReplayHandler);
  showScreen(resultElement);
};

export {showResultScreen};
