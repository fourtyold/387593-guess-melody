import GameView from './game-view.js';
import GameModel from './game-model.js';
import {State, gameData, GameResult, QuestionType, NetData, TimerData} from '../../data.js';
import Application from '../../application.js';
import ResultModel from '../result/result-model.js';
import {togglePlayerControl} from '../../utils/util.js';
import GameLoader from '../../utils/game-loader.js';

const initialData = {
  State,
  gameData,
  GameResult,
  QuestionType
};

class Game {
  constructor(questionList, data = initialData) {
    this.model = new GameModel(questionList, data);
    this.view = new GameView(this.model);
  }

  init() {
    this.bind();
    this.model.resetGameData();
    this.model.updateQuestion();
    this.view.showScreen();
    this.view.updateScreen();
    this.view.showScreen();
    if (this.view.newPlayer) {
      this.view.newPlayer.play();
    }
    this.tick();
  }

  bind() {
    this.model.artistAnswerHandler = (evt, artistAnswers) => this.artistAnswerHandler(evt, artistAnswers);
    this.model.genreAnswerHandler = (evt, answerFlags) => this.genreAnswerHandler(evt, answerFlags);
    this.model.playerHandler = (artistPlayer, playerControl) => this.playerHandler(artistPlayer, playerControl);
    this.model.genreFlagsHandler = (answerFlags, genreAnswerSend) => this.genreFlagsHandler(answerFlags, genreAnswerSend);
    this.model.playersHandler = (evt, genrePlayers, playersControls) => this.playersHandler(evt, genrePlayers, playersControls);
    this.model.mainAnswerHandler = (evt) => this.mainAnswerHandler(evt);
    this.model.timeOutHandler = () => this.timeOutHandler();
  }

  showNextGameScreen(answer) {
    this.model.data.gameData.stat.push(answer);
    if (this.model.data.gameData.stat.length < this.model.questionList.length) {
      this.model.updateQuestion();
      this.view.updateScreen();
      this.view.showScreen();
      if (this.view.newPlayer) {
        this.view.newPlayer.play();
      }
    } else {
      const dataToSend = ResultModel.getResultToLoad(this.model.data.gameData);
      GameLoader.loadResults(`${NetData.SERVER_URL}/stats/${NetData.DEFAULT_USERNAME}`, dataToSend, GameModel.getHistory, (history) => {
        this.model.data.gameData.history = history;
        this.showResultScreen(this.model.data.GameResult.SCORE);
      });
    }
  }

  showResultScreen(screenType) {
    this.model.data.gameData.result = screenType;
    clearTimeout(this.timer);
    const resultObj = ResultModel.getResult(this.model.data.gameData);
    Application.showStats(resultObj);
  }

  tick() {
    this.model.timer.tick();
    if (this.model.timer.value > 0) {
      this.view.updateHeader();
      this.timer = setTimeout(() => this.tick(), TimerData.ONE_SECOND);
    }
  }

  mainAnswerHandler(evt) {
    let target = false;
    if (evt.target.classList.contains(`main-answer-preview`)) {
      target = evt.target.parentNode;
    } else if (evt.target.classList.contains(`main-answer`)) {
      target = evt.target;
    }
    return target;
  }

  playerHandler(artistPlayer, playerControl) {
    togglePlayerControl(artistPlayer, playerControl);
  }

  genreFlagsHandler(answerFlags, genreAnswerSend) {
    genreAnswerSend.disabled = !Array.from(answerFlags).some((flag) => {
      return flag.checked;
    });
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

  artistAnswerHandler(evt, artistAnswers) {
    const target = this.mainAnswerHandler(evt);
    if (target) {
      const answer = this.model.getArtistAnswer(artistAnswers, target);
      if (answer.status) {
        this.showNextGameScreen(answer);
      } else if (this.model.data.gameData.mistakes < this.model.data.State.MAX_MISTAKES) {
        this.model.data.gameData.mistakes++;
        this.showNextGameScreen(answer);
      } else {
        this.showResultScreen(this.model.data.GameResult.LIMIT);
      }
    }
  }

  genreAnswerHandler(evt, answerFlags) {
    evt.preventDefault();
    const answer = this.model.getGenreAnswer(answerFlags);
    if (answer.status) {
      this.showNextGameScreen(answer);
    } else if (this.model.data.gameData.mistakes < this.model.data.State.MAX_MISTAKES) {
      this.model.data.gameData.mistakes++;
      this.showNextGameScreen(answer);
    } else {
      this.showResultScreen(this.model.data.GameResult.LIMIT);
    }
  }

  timeOutHandler() {
    this.showResultScreen(this.model.data.GameResult.TIME);
  }

}

export default Game;
