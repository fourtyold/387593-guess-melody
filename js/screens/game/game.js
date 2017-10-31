import GameView from './game-view.js';
import GameModel from './game-model.js';
import {state, gameData, musicList, userAnswer, Question, gameResult} from '../../data.js';
import Application from '../../application.js';
import ResultModel from '../result/result-model.js';
import {togglePlayerControl} from '../../utils/util';

const initialData = {
  state,
  gameData,
  musicList,
  userAnswer,
  Question,
  gameResult
};

class GameScreen {
  constructor(data = initialData) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);
  }

  init() {
    this.bind();
    this.model.resetGameData();
    this.model.updateQuestion();
    this.view.showScreen(this.view);
    this.view.updateScreen();
    this.view.showScreen(this.view);
    this.view.newPlayer.play();
    this.tick();
  }

  bind() {
    this.model.artistAnswerHandler = (evt, artistAnswers) => this.artistAnswerHandler(evt, artistAnswers);
    this.model.genreAnswerHandler = (evt, answerFlags) => this.genreAnswerHandler(evt, answerFlags);
    this.model.onTimeOut = () => this.onTimeOut();
    this.model.playerHandler = (artistPlayer, playerControl) => this.playerHandler(artistPlayer, playerControl);
    this.model.genreFlagsHandler = (answerFlags, genreAnswerSend) => this.genreFlagsHandler(answerFlags, genreAnswerSend);
    this.model.playersHandler = (evt, genrePlayers, playersControls) => this.playersHandler(evt, genrePlayers, playersControls);
  }

  playerHandler(artistPlayer, playerControl) {
    togglePlayerControl(artistPlayer, playerControl);
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

  showNextGameScreen(answer) {
    this.model.data.gameData.stat.push(answer);
    if (this.model.data.gameData.stat.length < this.model.data.state.totalScreens) {
      this.model.updateQuestion();
      this.view.updateScreen();
      this.view.showScreen(this.view);
      if (this.view.newPlayer) {
        this.view.newPlayer.play();
      }
    } else {
      this.showResultScreen(this.model.data.gameResult.score);
    }
  }

  showResultScreen(screenType) {
    this.model.data.gameData.result = screenType;
    this.stopTimer();
    const resultObj = ResultModel.getResult(this.model.data.gameData);
    Application.showStats(resultObj);
  }

  artistAnswerHandler(evt, artistAnswers) {
    const target = this.model.onArtistAnswer(evt);
    if (target) {
      const answer = this.model.getArtistAnswer(artistAnswers, target);
      if (answer.status) {
        this.showNextGameScreen(answer);
      } else if (this.model.data.gameData.mistakes < this.model.data.state.maxMistakes) {
        this.model.data.gameData.mistakes++;
        this.showNextGameScreen(answer);
      } else {
        this.showResultScreen(this.model.data.gameResult.limit);
      }
    }
  }

  genreAnswerHandler(evt, answerFlags) {
    evt.preventDefault();
    const answer = this.model.getGenreAnswer(answerFlags);
    if (answer.status) {
      this.showNextGameScreen(answer);
    } else if (this.model.data.gameData.mistakes < this.model.data.state.maxMistakes) {
      this.model.data.gameData.mistakes++;
      this.showNextGameScreen(answer);
    } else {
      this.showResultScreen(this.model.data.gameResult.limit);
    }
  }

  onTimeOut() {
    this.model.data.gameData.mistakes = 0;
    this.model.data.gameData.stat = [];
    this.model.data.gameData.result = this.model.data.gameResult.time;
    const resultObj = ResultModel.getResult(this.model.data.gameData);
    Application.showStats(resultObj);
  }

  tick() {
    this.model.timer.tick();
    if (this.model.timer.value > 0) {
      this.view.updateHeader();
    }
    this.timer = setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
    this.model.timer.value = this.model.data.state.time;
  }

}

export default new GameScreen();
