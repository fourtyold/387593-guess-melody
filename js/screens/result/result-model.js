import {gameResult} from '../../data.js';

export default class ResultModel {
  constructor(result) {
    this.resultObj = result;
  }

  getResultTitle() {
    let content;
    switch (this.resultObj.userResult) {
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
    switch (this.resultObj.userResult) {
      case gameResult.limit:
        content = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
        break;
      case gameResult.time:
        content = `Время вышло!<br>Вы не успели отгадать все мелодии`;
        break;
      case gameResult.score:
        content = `За ${Math.floor(this.resultObj.totalTime / 60)} минуты и ${this.resultObj.totalTime % 60} секунд
       <br>вы набрали ${this.resultObj.userScore} баллов (${this.resultObj.fastAnswers} быстрых)
       <br>совершив ${this.resultObj.mistakesCnt} ошибки`;
        break;
    }
    return content;
  }

  getResultMainComparison() {
    let content;
    switch (this.resultObj.userResult) {
      case gameResult.limit:
      case gameResult.time:
        content = ``;
        break;
      case gameResult.score:
        content = `Вы заняли ${this.resultObj.currentPlace} место из ${this.resultObj.totalPlace}. Это лучше чем у ${this.resultObj.successPercent}% игроков`;
        break;
    }
    return content;
  }

  getButtonText() {
    let content;
    switch (this.resultObj.userResult) {
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
