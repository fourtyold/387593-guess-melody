export default class ResultModel {
  constructor(result) {
    this.resultObj = result;
  }

  static getResult(answerObj) {
    let time = 0;
    let answers = 0;
    const score = this.getScore(answerObj);
    answerObj.stat.forEach((it) => {
      time += it.time;
      if (it.time < 30) {
        answers++;
      }
    });
    if (answerObj.stat.length) {
      answerObj.history.push(score);
    }
    answerObj.history.sort((a, b) => {
      return b - a;
    });
    const success = (answerObj.history.length - (answerObj.history.indexOf(score) + 1)) / answerObj.history.length * 100;
    const place = answerObj.history.indexOf(score) + 1;
    return {
      userResult: answerObj.result,
      userScore: score,
      mistakesCnt: answerObj.mistakes,
      totalTime: time,
      fastAnswers: answers,
      successPercent: Math.floor(success),
      currentPlace: place,
      totalPlace: answerObj.history.length
    };
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
