import {showScreen} from '../../utils/show-element.js';
import Application from '../../application.js';
import WelcomeView from './welcome-view.js';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    this.view.mainPlayClick = () => {
      Application.showGame();
    };
    showScreen(this.view);
  }
}

export default new WelcomeScreen();
