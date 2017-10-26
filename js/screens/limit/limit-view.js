import AbstractView from '../../abstractview.js';
import mainReplayHandler from '../../utils/replay.js';

export default class LimitView extends AbstractView {

  get template() {

    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`;
  }

  bind() {
    const mainReplay = this.element.querySelector(`.main-replay`);
    mainReplay.addEventListener(`click`, mainReplayHandler);
  }
}
