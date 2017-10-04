import getElementFromTemplate from './element.js';
import mainReplayHandler from './replay.js';

const template = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>`;

const timeElement = getElementFromTemplate(template);
const mainReplay = timeElement.querySelector(`.main-replay`);

mainReplay.addEventListener(`click`, mainReplayHandler);

export default timeElement;
