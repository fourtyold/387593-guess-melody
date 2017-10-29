import {gameResult} from '../../data.js';
import getScore from '../../utils/score.js';
import getResult from '../../utils/get-result.js';

export default class ResultModel {
  constructor(result) {
    this.resultObj = result;
    this.resultSummary = getResult(this.resultObj);
  }

  getResultTitle() {
    let content;
    switch (this.resultObj.result) {
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
    switch (this.resultObj.result) {
      case gameResult.limit:
        content = `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
        break;
      case gameResult.time:
        content = `Время вышло!<br>Вы не успели отгадать все мелодии`;
        break;
      case gameResult.score:
        content = `За ${Math.floor(this.resultSummary.totalTime / 60)} минуты и ${this.resultSummary.totalTime % 60} секунд
       <br>вы набрали ${getScore(this.resultObj)} баллов (${this.resultSummary.fastAnswers} быстрых)
       <br>совершив ${this.resultObj.mistakes} ошибки`;
        break;
    }
    return content;
  }

  getResultMainComparison() {
    let content;
    switch (this.resultObj.result) {
      case gameResult.limit:
      case gameResult.time:
        content = ``;
        break;
      case gameResult.score:
        content = `Вы заняли ${this.resultSummary.currentPlace} место из ${this.resultObj.history.length}. Это лучше чем у ${this.resultSummary.successPercent}% игроков`;
        break;
    }
    return content;
  }

  getButtonText() {
    let content;
    switch (this.resultObj.result) {
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
