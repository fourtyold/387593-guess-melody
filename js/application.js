import welcomeScreen from './screens/welcome/welcome.js';
import GameScreen from './screens/game/game.js';
import resultScreen from './screens/result/result.js';
import {NetData} from './data.js';
import GameLoader from './utils/loader.js';
import ResultObject from './utils/result-object.js';

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

export default class Application {

  constructor() {
    this.gameLoader = new GameLoader();
  }

  getDataAndInit() {
    this.gameLoader.downloadData(`${NetData.SERVER_URL}/questions`, Application.init, Application._allowToPlay);
  }

  static init(loadedData) {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(loadedData),
      [ControllerId.RESULT]: resultScreen
    };
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      Application.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = Application.routes[id];
    if (controller) {
      if (data) {
        controller.init(this.decryptResult(this._loadState(data)));
      } else {
        controller.init(this._loadState(data));
      }
    }
  }

  static showGame() {
    location.hash = ControllerId.GAME;
  }

  static showStats(result) {
    location.hash = `${ControllerId.RESULT}?${this._saveState(this.cryptResult(result))}`;
  }

  static cryptResult(resultObj) {
    const cryptedStr = [];
    Object.keys(resultObj).forEach((it) => {
      cryptedStr.push(resultObj[it]);
    });
    return cryptedStr.join(NetData.CRYPT_KEY);
  }

  static decryptResult(cryptedStr) {
    const resultObj = new ResultObject();
    const cryptedArr = cryptedStr.split(NetData.CRYPT_KEY);
    Object.keys(resultObj).forEach((it, i) => {
      resultObj[it] = +cryptedArr[i];
    });
    return resultObj;
  }

  static _allowToPlay() {
    document.querySelector(`.main-play`).removeAttribute(`style`);
  }

  static _saveState(state) {
    return JSON.stringify(state);
  }

  static _loadState(dataString) {
    try {
      return JSON.parse(dataString);
    } catch (e) {
      return false;
    }
  }
}
