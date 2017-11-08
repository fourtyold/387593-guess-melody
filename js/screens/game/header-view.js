import AbstractView from '../../abstract-view.js';
import {TimerData} from '../../data.js';

export default class HeaderView extends AbstractView {

  constructor(mistakes, timer) {
    super();
    this.mistakes = mistakes;
    this.timer = timer;
  }

  get template() {

    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
cx="390" cy="390" r="370"
class="timer-line"
style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  <foreignObject width="100%" height="100" y="-30">
  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
   <span class="timer-value-mins">${(this.timer.value / TimerData.ONE_MINUTE < TimerData.DOUBLE_SIGN) ? `0` + Math.floor(this.timer.value / TimerData.ONE_MINUTE) : Math.floor(this.timer.value / TimerData.ONE_MINUTE)}</span><!--
  --><span class="timer-value-dots">:</span><!--
  --><span class="timer-value-secs">${(this.timer.value % TimerData.ONE_MINUTE < TimerData.DOUBLE_SIGN) ? `0` + this.timer.value % TimerData.ONE_MINUTE : this.timer.value % TimerData.ONE_MINUTE}</span>
      </div>
      </foreignObject>
      </svg>
      <div class="main-mistakes">
${new Array(this.mistakes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
  </div>`;
  }

  bind() {
    this.timerContainer = this.element.querySelectorAll(`span`);
    if (this.timer.value <= TimerData.WARNING_TIME) {
      this._blinkTimer();
    }
  }

  _blinkTimer() {
    Array.from(this.timerContainer).forEach((it, i) => {
      it.style.color = `red`;
      if (i !== 1) {
        setTimeout(() => {
          it.style.color = `transparent`;
        }, TimerData.BLINK_FREQUENCY);
      }
    });
  }
}
