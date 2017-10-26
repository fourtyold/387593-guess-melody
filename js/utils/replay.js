import {showScreen} from './show-element.js';
import welcome from '../screens/welcome/welcome.js';
import {initialState, gameData} from '../data.js';
import header from '../screens/header/header.js';
import artist from '../screens/artist/artist.js';
import genre from '../screens/genre/genre.js';

export default function mainReplayHandler() {
  initialState.notes = 3;
  gameData.stat = [];
  // artist._element = null;
  // genre._element = null;
  header._element = null;
  header.stopTimer();
  showScreen(welcome);
}
