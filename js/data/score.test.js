import assert from 'assert';
import getScore from '../utils/score';

const slowAns = {time: 30};
const fastAns = {time: 29};
const userAnswersSlow = [slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns, slowAns];
const userAnswersFast = [fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns, fastAns];
const userAnswersMix = [fastAns, fastAns, fastAns, fastAns, fastAns, slowAns, slowAns, slowAns, slowAns, slowAns];

describe(`Score validator`, () => {
  it(`should be -1, if out of time`, () => {
    assert.equal(-1, getScore([], 3));
  });
  it(`should be -1, if 4 mistakes`, () => {
    assert.equal(-1, getScore(userAnswersSlow, -1));
  });
  it(`should be 10, if no mistakes`, () => {
    assert.equal(10, getScore(userAnswersSlow, 3));
  });
  it(`should be 20, if fast no mistakes`, () => {
    assert.equal(20, getScore(userAnswersFast, 3));
  });
  it(`should be 4, if 3 mistakes`, () => {
    assert.equal(4, getScore(userAnswersSlow, 0));
  });
  it(`should be 14, if fast 3 mistakes`, () => {
    assert.equal(14, getScore(userAnswersFast, 0));
  });
  it(`should be 15, if mean no mistakes`, () => {
    assert.equal(15, getScore(userAnswersMix, 3));
  });
  it(`should be 9, if mean 3 mistakes`, () => {
    assert.equal(9, getScore(userAnswersMix, 0));
  });
});
