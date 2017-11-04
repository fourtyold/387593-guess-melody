export default class Timer {
  constructor(value, callback) {
    this.value = value;
    this.callback = callback;
  }

  tick() {
    if (--this.value > 0) {
      return true;
    } else {
      this.callback();
      return false;
    }
  }

  callback() {}
}
