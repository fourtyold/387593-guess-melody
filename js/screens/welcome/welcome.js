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
    this.view.showScreen(this.view);
  }
}

export default new WelcomeScreen();
