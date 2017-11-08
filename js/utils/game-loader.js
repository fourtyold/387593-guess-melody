import {QuestionType, gameData} from '../data.js';
import Application from '../application.js';

const REQUEST_SETTINGS = {
  headers: {
    'Content-Type': `application/json`
  },
  method: `GET`
};

export default class GameLoader {

  downloadData(url, startGame, allowToPlay) {
    return fetch(url, REQUEST_SETTINGS)
        .then((resp) => resp.json())
        .then((data) => (gameData.loadedData = data))
        .then(() => startGame(gameData.loadedData))
        .then(() => this._loadImage(gameData.loadedData, allowToPlay));
  }

  _loadImage(questionArray, allowToPlay) {
    const imgSrcList = GameLoader.getImageSrcList(questionArray);
    this._downloadImage(imgSrcList, allowToPlay);
  }

  _downloadImage(list, callback) {
    let imageCounter = 0;
    const onDataLoad = () => {
      imageCounter += 1;
      if (imageCounter === list.size - 1) {
        Application.init(gameData.loadedData);
        callback();
      }
    };
    const onLoadError = (media) => {
      GameLoader.changeImgUrl(media, gameData.loadedData);
    };
    list.forEach((it) => {
      let media = new Image();
      media.src = it;
      media.onload = () => {
        onDataLoad();
      };
      media.onerror = () => {
        onLoadError(media);
      };
    });
  }

  static changeImgUrl(media, questionArray) {
    for (let question of questionArray) {
      if (question.type === QuestionType.ARTIST) {
        for (let answer of question.answers) {
          if (media.src === answer.image.url) {
            answer.image.url = ``;
            return;
          }
        }
      }
    }
  }

  static loadResults(url, data, getHistory, showResult) {
    const uploadSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(url, uploadSettings)
        .then(() => fetch(url, REQUEST_SETTINGS))
        .then((resp) => resp.json())
        .then((stats) => getHistory(stats))
        .then((history) => showResult(history));
  }

  static getImageSrcList(questionArray) {
    const imgSrcList = new Set();
    questionArray.forEach((it) => {
      if (it.type === QuestionType.ARTIST) {
        it.answers.forEach((answer) => {
          imgSrcList.add(answer.image.url);
        });
      }
    });
    return imgSrcList;
  }

}
