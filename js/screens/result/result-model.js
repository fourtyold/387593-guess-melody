import {State} from '../../data.js';
import ResultObject from '../../utils/result-object.js';

export default class ResultModel {
  constructor(result) {
    this.resultObj = result;
  }

  static getResult(answerObj) {

    const resultObj = new ResultObject();
    let time = 0;
    let answers = 0;
    const score = this._getScore(answerObj);
    answerObj.stat.forEach((it) => {
      time += it.time;
      if (it.time < 30) {
        answers++;
      }
    });
    answerObj.history.sort((a, b) => {
      return b - a;
    });
    resultObj.userResult = answerObj.result;
    resultObj.userScore = score;
    resultObj.mistakesCnt = answerObj.mistakes;
    resultObj.totalTime = time;
    resultObj.fastAnswers = answers;
    resultObj.successPercent = Math.floor((answerObj.history.length - (answerObj.history.indexOf(score) + 1)) / answerObj.history.length * 100);
    resultObj.currentPlace = answerObj.history.indexOf(score) + 1;
    resultObj.totalPlace = answerObj.history.length;
    return resultObj;
  }

  static _getScore(answerObj) {
    let score = State.MAX_SCORE;
    if (answerObj.mistakes > State.MAX_MISTAKES || answerObj.stat.length < State.ANSWERS_NUMBER - 1) {
      return -1;
    } else {
      score -= State.MISTAKE_PRICE * answerObj.mistakes;
    }
    answerObj.stat.forEach((it) => {
      if (it.time >= State.SLOW_ANSWER) {
        score--;
      }
    });
    return score;
  }

  static getResultToLoad(answerObj) {
    const scoreToLoad = this._getScore(answerObj);
    let timeToLoad = 0;
    answerObj.stat.forEach((it) => {
      timeToLoad += it.time;
    });
    return {score: scoreToLoad, time: timeToLoad};
  }
}
