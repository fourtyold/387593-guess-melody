import {showScreen} from './show-element.js';
import welcomeElement from './welcome.js';
import {initialState, gameData} from './data.js';

export default function mainReplayHandler(evt) {
  evt.target.removeEventListener(`click`, mainReplayHandler);
  initialState.time = 300;
  initialState.notes = 3;
  gameData.stat = [];
  showScreen(welcomeElement);
}
