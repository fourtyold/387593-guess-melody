import assert from 'assert';
import showScore from '../utils/score-show';

const usersScoreList = [1, 3, 5, 7, 9, 11, 13, 15, 17];

function getUserScore(userScore, leftNotes, userTimeLeft) {
  return {
    score: userScore,
    notes: leftNotes,
    timeLeft: userTimeLeft
  };
}

function getUsersScoreList() {
  const listCopy = usersScoreList.slice();
  return listCopy;
}

function getResult(place, percent) {
  return `Вы заняли ${place} место из 10 игроков. Это лучше чем у ${percent}% игроков`;
}

describe(`Score-show validator`, () => {
  it(`should be (Время вышло! Вы не успели отгадать все мелодии) if out of time`, () => {
    assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, showScore(usersScoreList, getUserScore(0, -1, 0)));
  });
  it(`should be (У вас закончились все попытки. Ничего, повезёт в следующий раз!) if out of notes`, () => {
    assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, showScore(usersScoreList, getUserScore(0, -1, 1)));
  });
  it(`should be (Вы заняли 10 место из 10 игроков. Это лучше чем у 0% игроков)`, () => {
    assert.equal(getResult(10, 0), showScore(getUsersScoreList(), getUserScore(0, 3, 1)));
  });
  it(`should be (Вы заняли 1 место из 10 игроков. Это лучше чем у 90% игроков)`, () => {
    assert.equal(getResult(1, 90), showScore(getUsersScoreList(), getUserScore(20, 3, 1)));
  });
  it(`should be (Вы заняли 5 место из 10 игроков. Это лучше чем у 50% игроков)`, () => {
    assert.equal(getResult(5, 50), showScore(getUsersScoreList(), getUserScore(10, 3, 1)));
  });
});
