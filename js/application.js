import welcomeScreen from './screens/welcome/welcome.js';
import gameScreen from './screens/game/game.js';
import resultScreen from './screens/result/result.js';

export default class Application {

  static showWelcome() {
    welcomeScreen.init();
  }

  static showGame() {
    gameScreen.init();
  }

  static showStats(result) {
    resultScreen.init(result);
  }

}
