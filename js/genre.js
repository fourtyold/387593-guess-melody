import getElementFromTemplate from './element.js';
import showScreen from './show-element.js';
import resultElement from './result.js';
import timeElement from './time.js';
import limitElement from './limit.js';

const template = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>`;

const genreElement = getElementFromTemplate(template);
const answerFlags = genreElement.querySelectorAll(`input[type=checkbox]`);
const genreAnswerSend = genreElement.querySelector(`.genre-answer-send`);

function answerFlagsHandler() {
  for (let i = 0; i < answerFlags.length; i++) {
    if (answerFlags[i].checked) {
      genreAnswerSend.disabled = false;
      break;
    } else {
      genreAnswerSend.disabled = true;
    }
  }
}

function genreAnswerSendHandler() {
  const randomNum = Math.random();
  switch (true) {
    case (randomNum <= 0.33):
      showScreen(resultElement);
      break;
    case (randomNum <= 0.66):
      showScreen(timeElement);
      break;
    case (randomNum > 0.66):
      showScreen(limitElement);
      break;
  }
  // Array.from(answerFlags).forEach((it) => {
  //   it.removeEventListener(`click`, answerFlagsHandler);
  // });
  // genreAnswerSend.removeEventListener(`click`, genreAnswerSendHandler);
}

(function () {
  answerFlagsHandler();
  Array.from(answerFlags).forEach((it) => {
    it.addEventListener(`click`, answerFlagsHandler);
  });
  genreAnswerSend.addEventListener(`click`, genreAnswerSendHandler);
})();

export default genreElement;
