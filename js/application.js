import welcomeScreen from './screens/welcome/welcome.js';
import GameScreen from './screens/game/game.js';
import resultScreen from './screens/result/result.js';
import {ResultObject, gameResult, NetData} from './data.js';
import Loader from './utils/loader.js';

// const CRYPT_KEY = `3748`;
// const SERVER_URL = `https://es.dump.academy/guess-melody`;
// const DEFAULT_USERNAME = `Mikhail387593`;

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

export default class Application {

  static getDataAndInit() {
    Loader.downloadData(`${NetData.SERVER_URL}/questions`, Application.init);
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
        controller.init(this.decryptResult(loadState(data)));
      } else {
        controller.init(loadState(data));
      }
    }
  }

  // static showWelcome() {
  //   location.hash = ControllerId.WELCOME;
  // }

  static showGame() {
    location.hash = ControllerId.GAME;
  }

  static showStats(result) {
    if (result.userResult === gameResult.score) {
      const dataToSend = {};
      dataToSend.time = result.totalTime;
      dataToSend.score = result.userScore;
      Loader.uploadResults(`${NetData.SERVER_URL}/stats/${NetData.DEFAULT_USERNAME}`, dataToSend);
    }
    location.hash = `${ControllerId.RESULT}?${saveState(this.cryptResult(result))}`;
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

}
