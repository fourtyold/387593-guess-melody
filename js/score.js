const slowAns = 30;
const maxNotes = 3;
const mistakePrice = 2;
const answersNumber = 10;

export default function getScore(userAnswersTime, notes) {
  let score = 20;
  if (notes === -1 || userAnswersTime.length < answersNumber - 1) {
    return -1;
  } else {
    score -= mistakePrice * (maxNotes - notes);
  }
  userAnswersTime.forEach((it) => {
    if (it >= slowAns) {
      score--;
    }
  });
  return score;
}
