const slowAns = 30;
const maxMistakes = 4;
const mistakePrice = 2;
const answersNumber = 10;

export default function getScore(answerObj) {
  let score = 20;
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
