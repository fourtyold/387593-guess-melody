import HeaderView from './header-view.js';
import getTimer from '../../utils/timer.js';
import {initialState} from '../../data.js';
import {showScreen} from '../../utils/show-element.js';
import time from '../time/time.js';

const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

const header = new HeaderView(getTimer(initialState.time, () => {
  showScreen(time);
}));

header.showHeader = () => {
  mainSection.insertBefore(header.element, mainSection.firstChild);
};

header.tick = () => {
  header.timerObj.tick();
  if (header.timerObj.value > 0) {
    header._element = null;
    mainSection.firstChild.remove();
    header.showHeader();
  }
  header.timer = setTimeout(header.tick, 1000);
};

header.stopTimer = () => {
  clearTimeout(header.timer);
  header.timerObj.value = initialState.time;
};

export default header;
