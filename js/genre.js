import getElementFromTemplate from './element.js';
import {showScreen} from './show-element.js';
import headerTemplate from './header.js';
import limitElement from './limit.js';
import {initialState, gameData, musicList, userAnswer} from './data.js';
import getQuestion from './question-data.js';
import {showResultScreen} from './result.js';

const genreTemplate = (game, question) => `
  <div class="main-wrap">
      <h2 class="title">${question.text[0] + question.answers[question.correctAnswers[0]].genre + question.text[1]} ${question.correctAnswers[0] + 1}</h2>
      <form class="genre">
       ${[...question.answers].map((answer, ind) =>
    `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${answer.src}"></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-${ind}">
          <label class="genre-answer-check" for="a-${ind}"></label>
        </div>`
  ).join(``)}    
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  `;

let gameQuestion;
let genreElement;
let answerFlags;
let genreAnswerSend;
let genrePlayers;
let playersControls;
let headerElement;
let genreForm;

const getVariables = () => {
  gameQuestion = getQuestion(musicList, gameData.genre);
  genreElement = getElementFromTemplate(genreTemplate(gameData, gameQuestion));
  answerFlags = genreElement.querySelectorAll(`input[type=checkbox]`);
  genreAnswerSend = genreElement.querySelector(`.genre-answer-send`);
  genrePlayers = genreElement.querySelectorAll(`audio`);
  playersControls = genreElement.querySelectorAll(`.player-control`);
  genreForm = genreElement.querySelector(`.genre`);
  headerElement = getElementFromTemplate(headerTemplate(initialState));
};

const nextScreen = () => {
  if (gameData.stat.length < 10) {
    getVariables();
    showScreen(genreElement, headerElement);
    setAnswerFlags();
    answerFlagsHandler();
    setHandlers();
  } else {
    showResultScreen();
  }
};

const playerHandler = (evt) => {
  if (evt.target.classList.contains(`player-control`)) {
    evt.preventDefault();
    let playerNumber = Array.from(playersControls).indexOf(evt.target);
    Array.from(genrePlayers).forEach((it, i) => {
      if (it !== genrePlayers[playerNumber]) {
        it.pause();
        playersControls[i].classList.remove(`player-control--pause`);
        playersControls[i].classList.add(`player-control--play`);
      }
    });
    if (genrePlayers[playerNumber].paused) {
      genrePlayers[playerNumber].play();
      playersControls[playerNumber].classList.remove(`player-control--play`);
      playersControls[playerNumber].classList.add(`player-control--pause`);
    } else {
      genrePlayers[playerNumber].pause();
      playersControls[playerNumber].classList.remove(`player-control--pause`);
      playersControls[playerNumber].classList.add(`player-control--play`);
    }
  }
};

const setAnswerFlags = () => {
  Array.from(answerFlags).forEach((it) => {
    it.checked = false;
  });
};

const answerFlagsHandler = () => {
  genreAnswerSend.disabled = true;
  for (let i = 0; i < answerFlags.length; i++) {
    if (answerFlags[i].checked) {
      genreAnswerSend.disabled = false;
      break;
    }
  }
};

const setHandlers = () => {
  Array.from(answerFlags).forEach((it) => {
    it.addEventListener(`click`, answerFlagsHandler);
  });
  genreAnswerSend.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    genreAnswerSendHandler();
  });
  genreForm.addEventListener(`click`, (evt) => {
    playerHandler(evt);
  });
};

const removeHandlers = () => {
  Array.from(answerFlags).forEach((it) => {
    it.removeEventListener(`click`, answerFlagsHandler);
  });
  genreAnswerSend.removeEventListener(`click`, (evt) => {
    evt.preventDefault();
    genreAnswerSendHandler();
  });
  genreForm.removeEventListener(`click`, (evt) => {
    playerHandler(evt);
  });
};

const genreAnswerSendHandler = () => {
  const answerLinks = [];
  const answer = Object.create(userAnswer);
  answer.status = true;
  answer.time = 30;
  Array.from(answerFlags).forEach((it, ind) => {
    if (it.checked) {
      if (gameQuestion.correctAnswers.indexOf(ind) === -1) {
        answer.status = false;
      }
      answerLinks.push(gameQuestion.answers[ind].src);
    }
  });
  answer.src = answerLinks;
  gameData.stat.push(answer);
  if (answer.status === true) {
    removeHandlers();
    nextScreen();
  } else if (initialState.notes > 0) {
    removeHandlers();
    initialState.notes--;
    nextScreen();
  } else {
    initialState.notes = 3;
    gameData.stat = [];
    showScreen(limitElement);
  }
};

(function () {
  getVariables();
})();

export {genreElement, setHandlers};
