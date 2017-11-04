import assert from 'assert';
import Timer from '../utils/timer.js';

const onTimerEnd = () => {
  return `Время вышло!`;
};
let timer = new Timer(60, onTimerEnd);

describe(`Timer validator`, () => {
  it(`value should be 59 after 1 tick`, () => {
    timer.tick();
    assert.equal(59, timer.value);
  });
  it(`value should be 58 after 2 tick`, () => {
    timer = new Timer(60, onTimerEnd);
    timer.tick();
    timer.tick();
    assert.equal(58, timer.value);
  });
  it(`should return false`, () => {
    timer = new Timer(0, onTimerEnd);
    assert.equal(false, timer.tick());
  });
});
