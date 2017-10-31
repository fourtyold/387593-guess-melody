import AbstractView from '../../abstractview.js';

export default class ArtistView extends AbstractView {

  constructor(gameQuestion) {
    super();
    this.gameQuestion = gameQuestion;
  }

  get template() {

    return `
    <div class="main-wrap">
      <h2 class="title main-title">${this.gameQuestion.text} ${this.gameQuestion.correctAnswer + 1}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${this.gameQuestion.answers[this.gameQuestion.correctAnswer].src}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        ${[...this.gameQuestion.answers].map((answer) =>
    `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="${answer.image}"
                 alt="Пелагея" width="134" height="134">
            ${answer.artist}
          </label>
        </div>`).join(``)}
      </form>
    </div>`;
  }

  bind() {

    const playerControl = this.element.querySelector(`.player-control`);
    const artistPlayer = this.element.querySelector(`audio`);
    playerControl.addEventListener(`click`, () => {
      this.playerHandler(artistPlayer, playerControl);
    });
    const gameForm = this.element.querySelector(`.main-list`);
    const artistAnswers = this.element.querySelectorAll(`.main-answer`);
    gameForm.addEventListener(`click`, (evt) => {
      this.artistAnswerHandler(evt, artistAnswers);
    });
    this.newPlayer = artistPlayer;
  }

  playerHandler() {}
  artistAnswerHandler() {}
}
