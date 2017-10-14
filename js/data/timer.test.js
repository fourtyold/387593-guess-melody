import assert from 'assert';
import getTimer from '../timer';

const timer = getTimer(60);
const endTimer = getTimer(0);

describe(`Timer validator`, () => {
  it(`value should be 59 after 1 tick`, () => {
    assert.equal(59, timer.tick().value);
  });
  it(`value should be 58 after 2 tick`, () => {
    assert.equal(58, timer.tick().tick().value);
  });
  it(`should say that (Время вышло!)`, () => {
    assert.equal(`Время вышло!`, endTimer.tick());
  });
});
