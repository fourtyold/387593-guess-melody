export default function getTimer(initValue) {
  return {
    value: initValue,
    tick() {
      return (this.value <= 0) ? `Время вышло!` : getTimer(this.value - 1);
    }
  };
}
