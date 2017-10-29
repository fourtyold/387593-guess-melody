import GameView from './game-view.js';
import GameModel from './game-model.js';
import {showScreen} from '../../utils/show-element.js';
import {state, gameData, musicList, userAnswer, Question, gameResult} from '../../data.js';
import Application from '../../application.js';

const TOTAL_LVL_COUNT = 10;

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
    this.model.artistAnswerHandler = (evt, artistAnswers) => this.artistAnswerHandler(evt, artistAnswers);
    this.model.genreAnswerHandler = (evt, answerFlags) => this.genreAnswerHandler(evt, answerFlags);
    this.model.onTimeOut = () => this.onTimeOut();
  }

  init() {
    this.model.resetGameData();
    this.model.getQuestion();
    showScreen(this.view);
    this.view.updateScreen();
    showScreen(this.view);
    this.view.newPlayer.play();
    this.tick();
  }

  showNextGameScreen(answer) {
    this.model.data.gameData.stat.push(answer);
    if (this.model.data.gameData.stat.length < TOTAL_LVL_COUNT) {
      this.model.getQuestion();
      this.view.updateScreen();
      showScreen(this.view);
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
    Application.showStats(this.model.data.gameData);
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
    Application.showStats(this.model.data.gameData);
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
