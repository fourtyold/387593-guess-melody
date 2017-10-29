import AbstractView from '../../abstractview.js';

export default class ResultView extends AbstractView {

  constructor(model) {
    super();
    this.model = model;
  }

  get template() {

    return `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.model.getResultTitle()}</h2>
    <div class="main-stat">${this.model.getResultMainStat()}</div>
    <span class="main-comparison">${this.model.getResultMainComparison()}</span>
    <span role="button" tabindex="0" class="main-replay">${this.model.getButtonText()}</span>
`;
  }

  bind() {
    const mainReplay = this.element.querySelector(`.main-replay`);
    mainReplay.addEventListener(`click`, this.replayHandler);
  }

  replayHandler() {}
}
