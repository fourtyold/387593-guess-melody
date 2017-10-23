import getElementFromTemplate from './element.js';
import {showScreen, showHeader} from './show-element.js';
import {genreElement, answerFlagsHandler} from './genre.js';
import headerTemplate from './header.js';
import {initialState, gameData, musicList, userAnswer} from './data.js';
import getQuestion from './question-data.js';
import limitElement from './limit.js';
import {togglePlayerControl} from './util.js';

const artistTemplate = (game, question) =>
  `
    <div class="main-wrap">
      <h2 class="title main-title">${question.text} ${question.correctAnswer + 1}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${question.answers[question.correctAnswer].src}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        ${[...question.answers].map((answer) =>
    `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="${answer.image}"
                 alt="Пелагея" width="134" height="134">
            ${answer.artist}
          </label>
        </div>`).join(``)}
      </form>
    </div>`;

let gameQuestion;
let artistElement;
let artistPlayer;
let playerControl;
let mainAnswers;
let headerElement;
let gameForm;

const ARTIST_LVL_COUNT = 5;

const getVariables = () => {
  gameQuestion = getQuestion(musicList, gameData.artist);
  artistElement = getElementFromTemplate(artistTemplate(gameData, gameQuestion));
  artistPlayer = artistElement.querySelector(`audio`);
  playerControl = artistElement.querySelector(`.player-control`);
  mainAnswers = artistElement.querySelectorAll(`.main-answer`);
  headerElement = getElementFromTemplate(headerTemplate(initialState));
  gameForm = artistElement.querySelector(`.main-list`);
};

const repeatLvl = () => {
  getVariables();
  showScreen(artistElement);
  showHeader(headerElement);
  artistPlayer.play();
  gameForm.addEventListener(`click`, (evt) => {
    mainAnswerHandler(evt);
  });
  // playerControl.addEventListener(`click`, playerHandler);
  playerControl.addEventListener(`click`, () => {
    togglePlayerControl(artistPlayer, playerControl);
  });
};

const switchLvl = () => {
  headerElement = getElementFromTemplate(headerTemplate(initialState));
  const answerFlags = genreElement.querySelectorAll(`input[type=checkbox]`);
  const genreAnswerSend = genreElement.querySelector(`.genre-answer-send`);
  Array.from(answerFlags).forEach((it) => {
    it.checked = false;
    it.addEventListener(`click`, answerFlagsHandler);
  });
  genreAnswerSend.disabled = true;
  showScreen(genreElement);
  showHeader(headerElement);
};

const nextScreen = () => {
  if (gameData.stat.length < ARTIST_LVL_COUNT) {
    repeatLvl();
  } else {
    switchLvl();
  }
};

const mainAnswerHandler = (evt) => {
  gameForm.removeEventListener(`click`, () => {
    mainAnswerHandler(evt);
  });
  playerControl.removeEventListener(`click`, () => {
    togglePlayerControl(artistPlayer, playerControl);
  });
  let target = false;
  if (evt.target.classList.contains(`main-answer-preview`)) {
    target = evt.target.parentNode;
  } else if (evt.target.classList.contains(`main-answer`)) {
    target = evt.target;
  }
  if (target) {
    const answerNumber = Array.from(mainAnswers).indexOf(target);
    const answer = Object.create(userAnswer);
    answer.time = 30;
    answer.src = gameQuestion.answers[answerNumber].src;
    if (answerNumber === gameQuestion.correctAnswer) {
      answer.status = true;
      gameData.stat.push(answer);
      nextScreen();
    } else if (initialState.notes > 0) {
      answer.status = false;
      gameData.stat.push(answer);
      initialState.notes--;
      nextScreen();
    } else {
      initialState.notes = 3;
      gameData.stat = [];
      showScreen(limitElement);
    }
  }
};

((() => {
  getVariables();
  gameForm.addEventListener(`click`, (evt) => {
    mainAnswerHandler(evt);
  });
  playerControl.addEventListener(`click`, () => {
    togglePlayerControl(artistPlayer, playerControl);
  });
  // playerControl.addEventListener(`click`, playerHandler);
})());

export {artistElement, artistPlayer};
