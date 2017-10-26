import GenreView from './genre-view.js';
import getQuestion from '../../utils/question-data.js';
import {initialState, gameData, musicList, userAnswer} from '../../data.js';
import {togglePlayerControl} from '../../utils/util.js';
import {showScreen} from '../../utils/show-element.js';
import result from '../result/result.js';
import limit from '../limit/limit.js';
import header from '../header/header.js';

const GENRE_LVL_COUNT = 10;
const genre = new GenreView(getQuestion(musicList, gameData.genre));

genre.answerFlagsHandler = (answerFlags, genreAnswerSend) => {
  genreAnswerSend.disabled = true;
  for (let i = 0; i < answerFlags.length; i++) {
    if (answerFlags[i].checked) {
      genreAnswerSend.disabled = false;
      break;
    }
  }
};

genre.nextScreen = () => {
  if (gameData.stat.length < GENRE_LVL_COUNT) {
    genre.gameQuestion = getQuestion(musicList, gameData.genre);
    showScreen(genre);
    header.showHeader();
  } else {
    result.getResult();
    result._element = null;
    header.stopTimer();
    showScreen(result);
  }
};

genre.genreAnswerSendHandler = (evt, answerFlags) => {
  evt.preventDefault();
  genre._element = null;
  const answerLinks = [];
  const answer = Object.create(userAnswer);
  answer.status = true;
  answer.time = gameData.answerTime - header.timerObj.value;
  gameData.answerTime = header.timerObj.value;
  Array.from(answerFlags).forEach((it, ind) => {
    if (it.checked) {
      if (genre.gameQuestion.correctAnswers.indexOf(ind) === -1) {
        answer.status = false;
      }
      answerLinks.push(genre.gameQuestion.answers[ind].src);
    }
  });
  answer.src = answerLinks;
  gameData.stat.push(answer);
  if (answer.status === true) {
    genre.nextScreen();
  } else if (initialState.notes > 0) {
    initialState.notes--;
    genre.nextScreen();
  } else {
    initialState.notes = 3;
    gameData.stat = [];
    header.stopTimer();
    showScreen(limit);
  }
};

genre.playerHandler = (evt, genrePlayers, playersControls) => {
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
    togglePlayerControl(genrePlayers[playerNumber], playersControls[playerNumber]);
  }
};

export default genre;
