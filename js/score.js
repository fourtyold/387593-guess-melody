const slowAns = 30;
const maxNotes = 3;
const mistakePrice = 2;
const answersNumber = 10;

export default function getScore(userAnswers, notes) {
  let score = 20;
  if (notes === -1 || userAnswers.length < answersNumber - 1) {
    return -1;
  } else {
    score -= mistakePrice * (maxNotes - notes);
  }
  userAnswers.forEach((it) => {
    if (it.time >= slowAns) {
      score--;
    }
  });
  return score;
}
