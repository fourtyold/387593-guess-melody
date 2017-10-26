import ArtistView from './artist-view.js';
import {togglePlayerControl} from '../../utils/util.js';
import {initialState, gameData, musicList, userAnswer} from '../../data.js';
import {showScreen} from '../../utils/show-element.js';
import getQuestion from '../../utils/question-data.js';
import genre from '../genre/genre.js';
import limit from '../limit/limit.js';
import header from '../header/header.js';

const ARTIST_LVL_COUNT = 5;

const artist = new ArtistView(getQuestion(musicList, gameData.artist));

artist.playerHandler = (artistPlayer, playerControl) => {
  togglePlayerControl(artistPlayer, playerControl);
};

artist.repeatLvl = () => {
  artist.gameQuestion = getQuestion(musicList, gameData.artist);
  showScreen(artist);
  header.showHeader();
  artist.newPlayer.play();
};

artist.switchLvl = () => {
  showScreen(genre);
  header.showHeader();
};

artist.nextScreen = () => {
  if (gameData.stat.length < ARTIST_LVL_COUNT) {
    artist.repeatLvl();
  } else {
    artist.switchLvl();
  }
};

artist.mainAnswerHandler = (evt, mainAnswers, gameQuestion) => {
  artist._element = null;
  let target = false;
  if (evt.target.classList.contains(`main-answer-preview`)) {
    target = evt.target.parentNode;
  } else if (evt.target.classList.contains(`main-answer`)) {
    target = evt.target;
  }
  if (target) {
    const answerNumber = Array.from(mainAnswers).indexOf(target);
    const answer = Object.create(userAnswer);
    answer.time = gameData.answerTime - header.timerObj.value;
    answer.src = gameQuestion.answers[answerNumber].src;
    gameData.answerTime = header.timerObj.value;
    if (answerNumber === gameQuestion.correctAnswer) {
      answer.status = true;
      gameData.stat.push(answer);
      artist.nextScreen();
    } else if (initialState.notes > 0) {
      answer.status = false;
      gameData.stat.push(answer);
      initialState.notes--;
      header._element = null;
      artist.nextScreen();
    } else {
      initialState.notes = 3;
      gameData.stat = [];
      header.stopTimer();
      showScreen(limit);
    }
  }
};

export default artist;
