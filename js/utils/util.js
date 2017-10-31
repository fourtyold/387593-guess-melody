import {ResultObject} from '../data.js';
const CRYPT_KEY = `3748`;

const togglePlayerControl = (player, playerControl) => {
  if (player.paused) {
    player.play();
    playerControl.classList.remove(`player-control--play`);
    playerControl.classList.add(`player-control--pause`);
  } else {
    player.pause();
    playerControl.classList.remove(`player-control--pause`);
    playerControl.classList.add(`player-control--play`);
  }
};

const cryptResult = (resultObj) => {
  const cryptedStr = [];
  Object.keys(resultObj).forEach((it) => {
    cryptedStr.push(resultObj[it]);
  });
  return cryptedStr.join(CRYPT_KEY);
};

const decryptResult = (cryptedStr) => {
  const resultObj = new ResultObject();
  const cryptedArr = cryptedStr.split(CRYPT_KEY);
  Object.keys(resultObj).forEach((it, i) => {
    resultObj[it] = +cryptedArr[i];
  });
  return resultObj;
};

export {togglePlayerControl, cryptResult, decryptResult};
