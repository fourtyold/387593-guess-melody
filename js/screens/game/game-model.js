import {Question} from '../../data.js';
import getTimer from '../../utils/timer.js';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.timer = getTimer(data.state.time, this.onTimeOut);
  }

  updateQuestion() {
    this.gameQuestion = (this.data.gameData.stat.length < this.data.state.artistScreens) ? (this.getQuestion(this.data.musicList, this.data.state.artist)) : (this.getQuestion(this.data.musicList, this.data.state.genre));
  }

  getQuestion(music, gameType) {
    const gameQuestion = new Question(gameType);
    const songs = music.slice();
    for (let i = 0; i < gameType; i++) {
      const song = songs.splice(Math.floor(Math.random() * songs.length), 1);
      gameQuestion.answers.push(song[0]);
    }
    if (gameQuestion.correctAnswer === null) {
      gameQuestion.correctAnswer = Math.floor(Math.random() * gameQuestion.answers.length);
    } else {
      const genre = gameQuestion.answers[Math.floor(Math.random() * gameQuestion.answers.length)].genre;
      gameQuestion.answers.forEach((answer, index) => {
        if (answer.genre === genre) {
          gameQuestion.correctAnswers.push(index);
        }
      });
    }
    return gameQuestion;
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
    answer.src = this.gameQuestion.answers[answerNumber].src;
    this.data.gameData.answerTime = this.timer.value;
    return answer;
  }

  getGenreAnswer(answerFlags) {
    const answerLinks = [];
    const answer = Object.create(this.data.userAnswer);
    answer.status = true;
    answer.time = this.data.gameData.answerTime - this.timer.value;
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

  playerHandler() {}
  genreFlagsHandler() {}
  playersHandler() {}
  artistAnswerHandler() {}
  genreAnswerHandler() {}
  onTimeOut() {}
}
