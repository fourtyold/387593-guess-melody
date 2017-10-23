export default function showScore(usersScoreList, userScore) {
  if (userScore.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (userScore.notes === -1) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {
    usersScoreList.push(userScore.score);
    usersScoreList.sort((a, b) => {
      return b - a;
    });
    const succesPercent = (usersScoreList.length - (usersScoreList.indexOf(userScore.score) + 1)) / usersScoreList.length * 100;
    return `Вы заняли ${usersScoreList.indexOf(userScore.score) + 1} место из ${usersScoreList.length} игроков. Это лучше чем у ${succesPercent}% игроков`;
  }
}
