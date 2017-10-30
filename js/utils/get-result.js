import getScore from './score.js';

const getResult = (answerObj) => {
  let time = 0;
  let answers = 0;
  const score = getScore(answerObj);
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
};

export default getResult;
