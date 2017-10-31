import AbstractView from '../../abstractview.js';
import {gameResult} from '../../data.js';

export default class ResultView extends AbstractView {

  constructor(model) {
    super();
    this.resultObj = model;
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
        content = `За ${Math.floor(this.resultObj.resultObj.totalTime / 60)} минуты и ${this.resultObj.resultObj.totalTime % 60} секунд
       <br>вы набрали ${this.resultObj.resultObj.userScore} баллов (${this.resultObj.resultObj.fastAnswers} быстрых)
       <br>совершив ${this.resultObj.resultObj.mistakesCnt} ошибки`;
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
}
