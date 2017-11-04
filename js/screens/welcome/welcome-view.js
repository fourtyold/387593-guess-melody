import AbstractView from '../../abstractview.js';

export default class WelcomeView extends AbstractView {

  get template() {
    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>`;
  }

  bind() {
    this.mainPlay = this.element.querySelector(`.main-play`);
    this.mainPlay.addEventListener(`click`, this.mainPlayClick);
    this.mainPlay.style.display = `none`;
  }

  mainPlayClick() {}
}
