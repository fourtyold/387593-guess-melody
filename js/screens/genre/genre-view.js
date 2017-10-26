import AbstractView from '../../abstractview.js';

export default class GenreView extends AbstractView {

  constructor(gameQuestion) {
    super();
    this.gameQuestion = gameQuestion;
  }

  get template() {

    return `
  <div class="main-wrap">
      <h2 class="title">${this.gameQuestion.text[0] + this.gameQuestion.answers[this.gameQuestion.correctAnswers[0]].genre + this.gameQuestion.text[1]} ${this.gameQuestion.correctAnswers[0] + 1}</h2>
      <form class="genre">
       ${[...this.gameQuestion.answers].map((answer, ind) =>
    `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${answer.src}"></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-${ind}">
          <label class="genre-answer-check" for="a-${ind}"></label>
        </div>`
  ).join(``)}    
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>`;
  }

  bind() {
    const answerFlags = this.element.querySelectorAll(`input[type=checkbox]`);
    const genreAnswerSend = this.element.querySelector(`.genre-answer-send`);
    const genreForm = this.element.querySelector(`.genre`);
    const genrePlayers = this.element.querySelectorAll(`audio`);
    const playersControls = this.element.querySelectorAll(`.player-control`);

    this.answerFlagsHandler(answerFlags, genreAnswerSend);
    Array.from(answerFlags).forEach((it) => {
      it.addEventListener(`click`, () => {
        this.answerFlagsHandler(answerFlags, genreAnswerSend);
      });
    });
    genreAnswerSend.addEventListener(`click`, (evt) => {
      this.genreAnswerSendHandler(evt, answerFlags);
    });
    genreForm.addEventListener(`click`, (evt) => {
      this.playerHandler(evt, genrePlayers, playersControls);
    });
  }

  answerFlagsHandler() {}
  genreAnswerSendHandler() {}
  playerHandler() {}
  nextScreen() {}
}
