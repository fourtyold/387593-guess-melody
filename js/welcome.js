import getElementFromTemplate from './element.js';
import showScreen from './show-element.js';
import artistElement from './artist.js';

const template = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>`;

const welcomeElement = getElementFromTemplate(template);
const mainPlay = welcomeElement.querySelector(`.main-play`);

function mainPlayHandler() {
  showScreen(artistElement);
  // mainPlay.removeEventListener(`click`, mainPlayHandler);
}

mainPlay.addEventListener(`click`, mainPlayHandler);

export default welcomeElement;
