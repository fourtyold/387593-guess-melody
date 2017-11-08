import Application from '../../application.js';
import ResultView from './result-view.js';
import ResultModel from './result-model.js';

class Result {

  init(result) {
    this.model = new ResultModel(result);
    this.view = new ResultView(this.model);
    this.view.replayHandler = () => {
      Application.showGame();
    };
    this.view.showScreen();
  }
}

export default new Result();
