import AbstractView from '../../abstract-view.js';
import {GameResult, TimerData} from '../../data.js';

export default class ResultView extends AbstractView {

  constructor(model) {
    super();
    this.resultObj = model;
    this.markupObj = this._getScoreMarkup();
  }

  get template() {

    return `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this._getResultTitle()}</h2>
    <div class="main-stat">${this._getResultMainStat()}</div>
    <span class="main-comparison">${this._getResultMainComparison()}</span>
    <span role="button" tabindex="0" class="main-replay">${this._getButtonText()}</span>
`;
  }

  bind() {
    const mainReplay = this.element.querySelector(`.main-replay`);
    mainReplay.addEventListener(`click`, this.replayHandler);
  }

  _getResultTitle() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case GameResult.LIMIT:
        content = `Какая жалость!`;
        break;
      case GameResult.TIME:
        content = `Увы и ах!`;
        break;
      case GameResult.SCORE:
        content = `Вы настоящий меломан!`;
        break;
    }
    return content;
  }

  _getResultMainStat() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case GameResult.LIMIT:
        content = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
        break;
      case GameResult.TIME:
        content = `Время вышло!<br>Вы не успели отгадать все мелодии`;
        break;
      case GameResult.SCORE:
        content = `За ${this.markupObj.minutesNum} ${this.markupObj.minutesForm} и ${this.markupObj.secondsNum} ${this.markupObj.secondsForm}
       <br>вы набрали ${this.markupObj.scoreNum} ${this.markupObj.scoreForm} (${this.markupObj.fastNum} ${this.markupObj.fastForm})
       <br>совершив ${this.markupObj.mistakesNum} ${this.markupObj.mistakesForm}`;
        break;
    }
    return content;
  }

  _getResultMainComparison() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case GameResult.LIMIT:
      case GameResult.TIME:
        content = ``;
        break;
      case GameResult.SCORE:
        content = `Вы заняли ${this.resultObj.resultObj.currentPlace} место из ${this.resultObj.resultObj.totalPlace}. Это лучше чем у ${this.resultObj.resultObj.successPercent}% игроков`;
        break;
    }
    return content;
  }

  _getButtonText() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case GameResult.LIMIT:
      case GameResult.TIME:
        content = `Попробовать ещё раз`;
        break;
      case GameResult.SCORE:
        content = `Сыграть ещё раз`;
        break;
    }
    return content;
  }

  _getMarkupObjNumbers() {
    return {
      minutesNum: Math.floor(this.resultObj.resultObj.totalTime / TimerData.ONE_MINUTE),
      secondsNum: this.resultObj.resultObj.totalTime % TimerData.ONE_MINUTE,
      scoreNum: this.resultObj.resultObj.userScore,
      mistakesNum: this.resultObj.resultObj.mistakesCnt,
      fastNum: this.resultObj.resultObj.fastAnswers,
      place: this.resultObj.resultObj.currentPlace
    };
  }

  _getScoreMarkup() {
    const markupObj = this._getMarkupObjNumbers();
    markupObj.minutesForm = ResultView.getMinutesForm(markupObj.minutesNum);
    markupObj.secondsForm = ResultView.getSecondsForm(markupObj.secondsNum);
    markupObj.scoreForm = ResultView.getScoreForm(markupObj.scoreNum);
    markupObj.mistakesForm = ResultView.getMistakesForm(markupObj.mistakesNum);
    markupObj.fastForm = ResultView.getFastForm(markupObj.fastNum);
    return markupObj;
  }

  replayHandler() {}

  static getMinutesForm(minutes) {
    let minutesForm;
    switch (true) {
      case minutes === 0:
      case minutes === 5:
        minutesForm = `минут`;
        break;
      case minutes === 1:
        minutesForm = `минуту`;
        break;
      default:
        minutesForm = `минуты`;
        break;
    }
    return minutesForm;
  }

  static getSecondsForm(seconds) {
    let secondsForm;
    switch (true) {
      case (seconds % 10) > 1 && (seconds % 10) < 5:
        secondsForm = `секунды`;
        break;
      case (seconds % 10) === 1:
        secondsForm = `секунду`;
        break;
      default:
        secondsForm = `секунд`;
        break;
    }
    return secondsForm;
  }

  static getScoreForm(score) {
    let scoreForm;
    switch (true) {
      case score === 4:
        scoreForm = `балла`;
        break;
      default:
        scoreForm = `баллов`;
        break;
    }
    return scoreForm;
  }

  static getMistakesForm(mistakes) {
    let mistakesForm;
    switch (true) {
      case mistakes === 0:
        mistakesForm = `ошибок`;
        break;
      case mistakes === 1:
        mistakesForm = `ошибку`;
        break;
      default:
        mistakesForm = `ошибки`;
        break;
    }
    return mistakesForm;
  }

  static getFastForm(fastAns) {
    let fastForm;
    switch (true) {
      case fastAns === 1:
        fastForm = `быстрый`;
        break;
      default:
        fastForm = `быстрых`;
        break;
    }
    return fastForm;
  }

}
