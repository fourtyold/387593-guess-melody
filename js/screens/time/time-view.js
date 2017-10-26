import AbstractView from '../../abstractview.js';
import mainReplayHandler from '../../utils/replay.js';

export default class TimeView extends AbstractView {

  get template() {

    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`;
  }

  bind() {
    const mainReplay = this.element.querySelector(`.main-replay`);
    mainReplay.addEventListener(`click`, mainReplayHandler);
  }

}
