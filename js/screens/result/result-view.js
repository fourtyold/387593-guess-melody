import AbstractView from '../../abstractview.js';
import {initialState, gameData} from '../../data.js';
import getScore from '../../utils/score.js';
import mainReplayHandler from '../../utils/replay.js';

export default class ResultView extends AbstractView {

  constructor(result) {
    super();
    this.resultObj = result;
  }

  get template() {

    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${Math.floor(this.resultObj.totalTime / 60)}&nbsp;минуты и ${this.resultObj.totalTime % 60}&nbsp;секунд
      <br>вы&nbsp;набрали ${getScore(gameData.stat, initialState.notes)} баллов (${this.resultObj.fastAnswers} быстрых)
      <br>совершив ${3 - initialState.notes} ошибки</div>
    <span class="main-comparison">Вы заняли ${this.resultObj.currentPlace} место из ${gameData.history.length}. Это&nbsp;лучше чем у&nbsp;${this.resultObj.successPercent}%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>`;
  }

  bind() {
    const mainReplay = this.element.querySelector(`.main-replay`);
    mainReplay.addEventListener(`click`, mainReplayHandler);
  }

  getResult() {}
}
