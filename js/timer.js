export default function getTimer(initValue, callback) {
  return {
    value: initValue,
    tick() {
      if (--this.value > 0) {
        return true;
      } else {
        callback();
        return false;
      }
    }
  };
}
