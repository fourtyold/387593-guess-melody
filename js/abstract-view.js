const app = document.querySelector(`.app`);
const mainSection = app.querySelector(`.main`);

export default class AbstractView {
  get template() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  render() {
    return AbstractView.getElementFromTemplate(this.template.trim());
  }

  showScreen() {
    while (mainSection.firstChild) {
      mainSection.firstChild.remove();
    }
    mainSection.appendChild(this.element);
  }

  bind() {}

  static getElementFromTemplate(str) {
    let div = document.createElement(`div`);
    div.appendChild(document.createRange().createContextualFragment(str));
    return div;
  }

}
