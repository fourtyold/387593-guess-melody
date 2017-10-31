const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

export default class AbstractView {
  get template() {}

  render() {
    return this.getElementFromTemplate(this.template.trim());
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  getElementFromTemplate(str) {
    let div = document.createElement(`div`);
    div.appendChild(document.createRange().createContextualFragment(str));
    return div;
  }

  showScreen(screen) {
    while (mainSection.firstChild) {
      mainSection.firstChild.remove();
    }
    mainSection.appendChild(screen.element);
  }

}
