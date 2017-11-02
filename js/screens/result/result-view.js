import AbstractView from '../../abstractview.js';
import {gameResult} from '../../data.js';

export default class ResultView extends AbstractView {

  constructor(model) {
    super();
    this.resultObj = model;
    this.markupObj = this.getScoreMarkup();
  }

  get template() {

    return `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.getResultTitle()}</h2>
    <div class="main-stat">${this.getResultMainStat()}</div>
    <span class="main-comparison">${this.getResultMainComparison()}</span>
    <span role="button" tabindex="0" class="main-replay">${this.getButtonText()}</span>
`;
  }

  bind() {
    const mainReplay = this.element.querySelector(`.main-replay`);
    mainReplay.addEventListener(`click`, this.replayHandler);
  }

  replayHandler() {}

  getResultTitle() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case gameResult.limit:
        content = `Какая жалость!`;
        break;
      case gameResult.time:
        content = `Увы и ах!`;
        break;
      case gameResult.score:
        content = `Вы настоящий меломан!`;
        break;
    }
    return content;
  }

  getResultMainStat() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case gameResult.limit:
        content = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
        break;
      case gameResult.time:
        content = `Время вышло!<br>Вы не успели отгадать все мелодии`;
        break;
      case gameResult.score:
        content = `За ${this.markupObj.minutesNum} ${this.markupObj.minutesForm} и ${this.markupObj.secondsNum} ${this.markupObj.secondsForm}
       <br>вы набрали ${this.markupObj.scoreNum} ${this.markupObj.scoreForm} (${this.markupObj.fastNum} ${this.markupObj.fastForm})
       <br>совершив ${this.markupObj.mistakesNum} ${this.markupObj.mistakesForm}`;
        break;
    }
    return content;
  }

  getResultMainComparison() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case gameResult.limit:
      case gameResult.time:
        content = ``;
        break;
      case gameResult.score:
        content = `Вы заняли ${this.resultObj.resultObj.currentPlace} место из ${this.resultObj.resultObj.totalPlace}. Это лучше чем у ${this.resultObj.resultObj.successPercent}% игроков`;
        break;
    }
    return content;
  }

  getButtonText() {
    let content;
    switch (this.resultObj.resultObj.userResult) {
      case gameResult.limit:
      case gameResult.time:
        content = `Попробовать ещё раз`;
        break;
      case gameResult.score:
        content = `Сыграть ещё раз`;
        break;
    }
    return content;
  }

  getScoreMarkup() {
    const markupObj = {};
    markupObj.minutesNum = Math.floor(this.resultObj.resultObj.totalTime / 60);
    markupObj.secondsNum = this.resultObj.resultObj.totalTime % 60;
    markupObj.scoreNum = this.resultObj.resultObj.userScore;
    markupObj.mistakesNum = this.resultObj.resultObj.mistakesCnt;
    markupObj.fastNum = this.resultObj.resultObj.fastAnswers;
    markupObj.place = this.resultObj.resultObj.currentPlace;
    switch (true) {
      case markupObj.minutesNum === 0:
      case markupObj.minutesNum === 5:
        markupObj.minutesForm = `минут`;
        break;
      case markupObj.minutesNum === 1:
        markupObj.minutesForm = `минуту`;
        break;
      default:
        markupObj.minutesForm = `минуты`;
        break;
    }
    switch (true) {
      case (markupObj.secondsNum % 10) > 1 && (markupObj.secondsNum % 10) < 5:
        markupObj.secondsForm = `секунды`;
        break;
      case (markupObj.secondsNum % 10) === 1:
        markupObj.secondsForm = `секунду`;
        break;
      default:
        markupObj.secondsForm = `секунд`;
        break;
    }
    switch (true) {
      case markupObj.scoreNum === 4:
        markupObj.scoreForm = `балла`;
        break;
      default:
        markupObj.scoreForm = `баллов`;
        break;
    }
    switch (true) {
      case markupObj.mistakesNum === 0:
        markupObj.mistakesForm = `ошибок`;
        break;
      case markupObj.mistakesNum === 1:
        markupObj.mistakesForm = `ошибку`;
        break;
      default:
        markupObj.mistakesForm = `ошибки`;
        break;
    }
    switch (true) {
      case markupObj.fastNum === 1:
        markupObj.fastForm = `быстрый`;
        break;
      default:
        markupObj.fastForm = `быстрых`;
        break;
    }
    return markupObj;
  }
}
