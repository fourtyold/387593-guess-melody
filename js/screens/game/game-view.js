import AbstractView from '../../abstractview.js';
import ArtistView from './artist-view.js';
import GenreView from './genre-view.js';
import HeaderView from './header-view.js';

const ARTIST_LVL_COUNT = 9;

const update = (container, view) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  container.appendChild(view.element);
};

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
    const view = (this.model.data.gameData.stat.length < ARTIST_LVL_COUNT) ? (new ArtistView(this.model.gameQuestion)) : (new GenreView(this.model.gameQuestion));
    view.playerHandler = (artistPlayer, playerControl) => this.model.playerHandler(artistPlayer, playerControl);
    view.artistAnswerHandler = (evt, artistAnswers) => this.model.artistAnswerHandler(evt, artistAnswers);
    view.playersHandler = (evt, genrePlayers, playersControls) => this.model.playersHandler(evt, genrePlayers, playersControls);
    view.genreFlagsHandler = (answerFlags, genreAnswerSend) => this.model.genreFlagsHandler(answerFlags, genreAnswerSend);
    view.genreAnswerHandler = (evt, answerFlags) => this.model.genreAnswerHandler(evt, answerFlags);
    update(this.levelContainer, view);
    this.newPlayer = view.newPlayer;
  }

  updateHeader() {
    update(this.headerContainer, new HeaderView(this.model.data.gameData.mistakes, this.model.timer));
  }
}
