import getQuestion from '../../utils/question-data.js';
import {togglePlayerControl} from '../../utils/util.js';
import getTimer from '../../utils/timer.js';

const ARTIST_LVL_COUNT = 9;

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.timer = getTimer(data.state.time, this.onTimeOut);
  }

  getQuestion() {
    this.gameQuestion = (this.data.gameData.stat.length < ARTIST_LVL_COUNT) ? (getQuestion(this.data.musicList, this.data.state.artist)) : (getQuestion(this.data.musicList, this.data.state.genre));
  }

  playerHandler(artistPlayer, playerControl) {
    togglePlayerControl(artistPlayer, playerControl);
  }

  onArtistAnswer(evt) {
    let target = false;
    if (evt.target.classList.contains(`main-answer-preview`)) {
      target = evt.target.parentNode;
    } else if (evt.target.classList.contains(`main-answer`)) {
      target = evt.target;
    }
    return target;
  }

  getArtistAnswer(artistAnswers, target) {
    const answerNumber = Array.from(artistAnswers).indexOf(target);
    const answer = Object.create(this.data.userAnswer);
    answer.time = this.data.gameData.answerTime - this.timer.value;
    if (answerNumber !== this.gameQuestion.correctAnswer) {
      answer.status = false;
    }
    // answer.time = 30;
    answer.src = this.gameQuestion.answers[answerNumber].src;
    this.data.gameData.answerTime = this.timer.value;
    return answer;
  }

  genreFlagsHandler(answerFlags, genreAnswerSend) {
    genreAnswerSend.disabled = true;
    for (let i = 0; i < answerFlags.length; i++) {
      if (answerFlags[i].checked) {
        genreAnswerSend.disabled = false;
        break;
      }
    }
  }

  playersHandler(evt, genrePlayers, playersControls) {
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
  }

  getGenreAnswer(answerFlags) {
    const answerLinks = [];
    const answer = Object.create(this.data.userAnswer);
    answer.status = true;
    answer.time = this.data.gameData.answerTime - this.timer.value;
    // answer.time = 30;
    this.data.gameData.answerTime = this.timer.value;
    Array.from(answerFlags).forEach((it, ind) => {
      if (it.checked) {
        if (this.gameQuestion.correctAnswers.indexOf(ind) === -1) {
          answer.status = false;
        }
        answerLinks.push(this.gameQuestion.answers[ind].src);
      }
    });
    answer.src = answerLinks;
    return answer;
  }

  resetGameData() {
    this.data.gameData.mistakes = 0;
    this.data.gameData.stat = [];
    this.data.gameData.answerTime = this.data.state.time;
  }

  artistAnswerHandler() {}
  genreAnswerHandler() {}
  onTimeOut() {}
}
