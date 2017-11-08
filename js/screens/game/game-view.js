import AbstractView from '../../abstract-view.js';
import ArtistView from './artist-view.js';
import GenreView from './genre-view.js';
import HeaderView from './header-view.js';

export default class GameView extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {

    return `<div class="header-container"></div><div class="level-container"></div>`;
  }

  bind() {
    this.headerContainer = this.element.querySelector(`.header-container`);
    this.levelContainer = this.element.querySelector(`.level-container`);
  }

  updateScreen() {
    this.updateHeader();
    const view = (this.model.gameQuestion.type === this.model.data.QuestionType.ARTIST) ? (new ArtistView(this.model.gameQuestion)) : (new GenreView(this.model.gameQuestion));
    view.playerHandler = (artistPlayer, playerControl) => this.model.playerHandler(artistPlayer, playerControl);
    view.artistAnswerHandler = (evt, artistAnswers) => this.model.artistAnswerHandler(evt, artistAnswers);
    view.playersHandler = (evt, genrePlayers, playersControls) => this.model.playersHandler(evt, genrePlayers, playersControls);
    view.genreFlagsHandler = (answerFlags, genreAnswerSend) => this.model.genreFlagsHandler(answerFlags, genreAnswerSend);
    view.genreAnswerHandler = (evt, answerFlags) => this.model.genreAnswerHandler(evt, answerFlags);
    GameView.update(this.levelContainer, view);
    this.newPlayer = view.newPlayer;
  }

  updateHeader() {
    GameView.update(this.headerContainer, new HeaderView(this.model.data.gameData.mistakes, this.model.timer));
  }

  static update(container, view) {
    while (container.firstChild) {
      container.firstChild.remove();
    }
    container.appendChild(view.element);
  }

}
