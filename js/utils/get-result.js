import getScore from './score.js';

const getResult = (answerObj) => {
  let time = 0;
  let answers = 0;
  answerObj.stat.forEach((it) => {
    time += it.time;
    if (it.time < 30) {
      answers++;
    }
  });
  if (answerObj.stat.length) {
    answerObj.history.push(getScore(answerObj));
  }
  answerObj.history.sort((a, b) => {
    return b - a;
  });
  const success = (answerObj.history.length - (answerObj.history.indexOf(getScore(answerObj)) + 1)) / answerObj.history.length * 100;
  const place = answerObj.history.indexOf(getScore(answerObj)) + 1;
  return {
    totalTime: time,
    fastAnswers: answers,
    successPercent: Math.floor(success),
    currentPlace: place
  };
};

export default getResult;