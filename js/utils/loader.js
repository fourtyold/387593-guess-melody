import {QuestionType, gameData} from '../data.js';
import Application from '../application.js';

const requestSettings = {
  headers: {
    'Content-Type': `application/json`
  },
  method: `GET`
};

export default class Loader {

  static downloadData(url, startGame, allowToPlay) {
    return fetch(url, requestSettings)
        .then((resp) => resp.json())
        .then((data) => (gameData.loadedData = data))
        .then(() => startGame(gameData.loadedData))
        .then(() => this._loadImage(gameData.loadedData))
        .then(() => this._loadAudio(gameData.loadedData, allowToPlay));
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
        .then(() => fetch(url, requestSettings))
        .then((resp) => resp.json())
        .then((stats) => getHistory(stats))
        .then((history) => showResult(history));
  }

  static _loadImage(questionArray) {
    const imgSrcList = this._getImageSrcList(questionArray);
    this._downloadImage(imgSrcList);
  }

  static _loadAudio(questionArray, allowToPlay) {
    const audioSrcList = this._getAudioSrcList(questionArray);
    this._downloadAudio(audioSrcList, allowToPlay);
  }

  static _getImageSrcList(questionArray) {
    const imgSrcList = [];
    questionArray.forEach((it) => {
      if (it.type === QuestionType.ARTIST) {
        it.answers.forEach((answer) => {
          imgSrcList.push(answer.image.url);
        });
      }
    });
    return imgSrcList;
  }

  static _getAudioSrcList(questionArray) {
    const audioSrcList = [];
    questionArray.forEach((it) => {
      if (it.type === QuestionType.ARTIST) {
        audioSrcList.push(it.src);
      } else {
        it.answers.forEach((answer) => {
          audioSrcList.push(answer.src);
        });
      }
    });
    return audioSrcList;
  }

  static _downloadImage(list) {
    let imgCounter = 0;
    const onDataLoad = (media) => {
      imgCounter += 1;
      console.log(media);
      if (imgCounter === list.length) {
        console.log(`IMAGE READY`);
      }
    };
    const onLoadError = (media) => {
      imgCounter += 1;
      this._changeImgUrl(media, gameData.loadedData);
      if (imgCounter === list.length) {
        console.log(`IMAGE LOADED`);
      }
    };
    list.forEach((it) => {
      let media = new Image();
      media.src = it;
      media.onload = () => {
        onDataLoad(media);
      };
      media.onerror = () => {
        onLoadError(media);
      };
    });
  }

  static _downloadAudio(list, callback) {
    let audioCounter = 0;
    const onDataLoad = (media) => {
      audioCounter += 1;
      console.log(media);
      if (audioCounter === list.length) {
        Application.init(gameData.loadedData);
        callback();
      }
    };
    const onLoadError = (media) => {
      audioCounter += 1;
      this._changeAudioUrl(media, gameData.loadedData);
      if (audioCounter === list.length) {
        Application.init(gameData.loadedData);
        callback();
      }
    };
    list.forEach((it) => {
      let media = new Audio(it);
      media.oncanplaythrough = () => {
        onDataLoad(media);
      };
      media.onerror = () => {
        onLoadError(media);
      };
    });
  }

  static _changeImgUrl(media, questionArray) {
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

  static _changeAudioUrl(media, questionArray) {
    for (let question of questionArray) {
      if (question.type === QuestionType.ARTIST) {
        if (media.src === question.src) {
          question.src = ``;
          return;
        }
      } else {
        for (let answer of question.answers) {
          if (media.src === answer.src) {
            answer.src = ``;
            return;
          }
        }
      }
    }
  }

}
