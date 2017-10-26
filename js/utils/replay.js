import {showScreen} from './show-element.js';
import welcome from '../screens/welcome/welcome.js';
import {initialState, gameData} from '../data.js';
import header from '../screens/header/header.js';

export default function mainReplayHandler() {
  initialState.notes = 3;
  gameData.stat = [];
  header._element = null;
  header.stopTimer();
  showScreen(welcome);
}
