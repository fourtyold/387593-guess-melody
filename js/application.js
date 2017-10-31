import welcomeScreen from './screens/welcome/welcome.js';
import gameScreen from './screens/game/game.js';
import resultScreen from './screens/result/result.js';
import {cryptResult, decryptResult} from './utils/util.js';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return false;
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.RESULT]: resultScreen
};

export default class Application {

  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      if (data) {
        controller.init(decryptResult(loadState(data)));
      } else {
        controller.init(loadState(data));
      }
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showGame() {
    location.hash = ControllerId.GAME;
  }

  static showStats(result) {
    location.hash = `${ControllerId.RESULT}?${saveState(cryptResult(result))}`;
  }

}
