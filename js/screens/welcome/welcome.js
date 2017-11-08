import Application from '../../application.js';
import WelcomeView from './welcome-view.js';

class Welcome {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    this.view.mainPlayHandler = () => {
      Application.showGame();
    };
    this.view.showScreen();
  }

}

export default new Welcome();
