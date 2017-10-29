import assert from 'assert';
import getScore from '../utils/score';

const slowAns = {time: 30};
const fastAns = {time: 29};
const userAnswersSlow = [slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns];
const userAnswersFast = [fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns];
const userAnswersMix = [fastAns, fastAns, fastAns, fastAns, fastAns, slowAns, slowAns, slowAns, slowAns, slowAns];

function AnswerObj(answers, mistakes) {
  this.mistakes = mistakes;
  this.stat = answers;
}

describe(`Score validator`, () => {
  let userAnswer = new AnswerObj([], 0);
  it(`should be -1, if out of time`, () => {
    assert.equal(-1, getScore(userAnswer));
  });
  it(`should be -1, if 4 mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersSlow, 4);
    assert.equal(-1, getScore(userAnswer));
  });
  it(`should be 10, if no mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersSlow, 0);
    assert.equal(10, getScore(userAnswer));
  });
  it(`should be 20, if fast no mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersFast, 0);
    assert.equal(20, getScore(userAnswer));
  });
  it(`should be 4, if 3 mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersSlow, 3);
    assert.equal(4, getScore(userAnswer));
  });
  it(`should be 14, if fast 3 mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersFast, 3);
    assert.equal(14, getScore(userAnswer));
  });
  it(`should be 15, if mean no mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersMix, 0);
    assert.equal(15, getScore(userAnswer));
  });
  it(`should be 9, if mean 3 mistakes`, () => {
    userAnswer = new AnswerObj(userAnswersMix, 3);
    assert.equal(9, getScore(userAnswer));
  });
});
