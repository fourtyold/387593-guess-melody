import {QuestionType, gameData} from '../data.js';
import Application from '../application.js';

const requestSettings = {
  headers: {
    'Content-Type': `application/json`
  },
  method: `GET`
};

export default class GameLoader {

  downloadData(url, startGame, allowToPlay) {
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

  _loadImage(questionArray) {
    const imgSrcList = GameLoader._getImageSrcList(questionArray);
    this._downloadImage(imgSrcList);
  }

  _loadAudio(questionArray, allowToPlay) {
    const audioSrcList = GameLoader._getAudioSrcList(questionArray);
    this._downloadAudio(audioSrcList, allowToPlay);
  }

  static _getImageSrcList(questionArray) {
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

  static _getAudioSrcList(questionArray) {
    const audioSrcList = new Set();
    for (let i = 0; i < 2; i++) {
      if (questionArray[i].type === QuestionType.ARTIST) {
        audioSrcList.add(questionArray[i].src);
      } else {
        questionArray[i].answers.forEach((answer) => {
          audioSrcList.add(answer.src);
        });
      }
    }
    return audioSrcList;
  }

  _downloadImage(list) {
    const onLoadError = (media) => {
      GameLoader._changeImgUrl(media, gameData.loadedData);
    };
    list.forEach((it) => {
      let media = new Image();
      media.src = it;
      media.onerror = () => {
        onLoadError(media);
      };
    });
  }

  _downloadAudio(list, callback) {
    let audioCounter = 0;
    const onDataLoad = () => {
      audioCounter += 1;
      if (audioCounter === list.size - 1) {
        Application.init(gameData.loadedData);
        callback();
      }
    };
    const onLoadError = (media) => {
      audioCounter += 1;
      GameLoader._changeAudioUrl(media, gameData.loadedData);
      if (audioCounter === list.size - 1) {
        Application.init(gameData.loadedData);
        callback();
      }
    };
    list.forEach((it) => {
      let media = new Audio(it);
      media.onloadeddata = () => {
        onDataLoad();
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
