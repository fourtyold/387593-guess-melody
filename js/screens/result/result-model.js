import {ResultObject} from '../../data.js';

export default class ResultModel {
  constructor(result) {
    this.resultObj = result;
  }

  static getResult(answerObj) {

    const resultObj = new ResultObject();
    let time = 0;
    let answers = 0;
    const score = this.getScore(answerObj);
    answerObj.stat.forEach((it) => {
      time += it.time;
      if (it.time < 30) {
        answers++;
      }
    });
    answerObj.history.push(score);
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

  static getScore(answerObj) {
    const slowAns = 30;
    const maxMistakes = 4;
    const mistakePrice = 2;
    const answersNumber = 10;
    const maxScore = 20;

    let score = maxScore;

    if (answerObj.mistakes === maxMistakes || answerObj.stat.length < answersNumber - 1) {
      return -1;
    } else {
      score -= mistakePrice * answerObj.mistakes;
    }
    answerObj.stat.forEach((it) => {
      if (it.time >= slowAns) {
        score--;
      }
    });
    return score;
  }

}
