import {showScreen} from '../../utils/show-element.js';
import Application from '../../application.js';
import ResultView from './result-view.js';
import ResultModel from './result-model.js';

class ResultScreen {

  init(result) {
    this.model = new ResultModel(result);
    this.view = new ResultView(this.model);
    this.view.replayHandler = () => {
      Application.showWelcome();
    };
    showScreen(this.view);
  }
}

export default new ResultScreen();
