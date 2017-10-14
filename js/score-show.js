export default function showScore(usersScoreList, userScore) {
  let result;
  if (userScore.timeLeft === 0) {
    result = `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (userScore.notes === -1) {
    result = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {
    usersScoreList.push(userScore.score);
    usersScoreList.sort((a, b) => {
      return b - a;
    });
    const succesPercent = (usersScoreList.length - (usersScoreList.indexOf(userScore.score) + 1)) / usersScoreList.length * 100;
    result = `Вы заняли ${usersScoreList.indexOf(userScore.score) + 1} место из ${usersScoreList.length} игроков. Это лучше чем у ${succesPercent}% игроков`;
  }
  return result;
}
