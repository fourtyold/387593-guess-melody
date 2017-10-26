import getElementFromTemplate from './utils/element.js';

export default class AbstractView {
  get template() {}

  render() {
    return getElementFromTemplate(this.template.trim());
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
