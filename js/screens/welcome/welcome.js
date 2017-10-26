import WelcomeView from './welcome-view.js';
import {showScreen} from '../../utils/show-element.js';
import artist from '../artist/artist.js';
import header from '../header/header.js';
import {gameData} from '../../data.js';

const welcome = new WelcomeView();

welcome.onMainPlayClick = () => {
  showScreen(artist);
  header.showHeader();
  gameData.answerTime = header.timerObj.value;
  header.tick();
  // const artistPlayer = artist.element.querySelector(`audio`);
  // artistPlayer.play();
  artist.newPlayer.play();
};

export default welcome;
