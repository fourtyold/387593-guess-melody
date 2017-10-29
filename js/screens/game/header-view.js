import AbstractView from '../../abstractview.js';

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

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
   <span class="timer-value-mins">${(this.timer.value / 60 < 10) ? `0` + Math.floor(this.timer.value / 60) : Math.floor(this.timer.value / 60)}</span><!--
  --><span class="timer-value-dots">:</span><!--
  --><span class="timer-value-secs">${(this.timer.value % 60 < 10) ? `0` + this.timer.value % 60 : this.timer.value % 60}</span>
      </div>
      </svg>
      <div class="main-mistakes">
${new Array(this.mistakes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
  </div>`;
  }

  bind() {
  }

}
