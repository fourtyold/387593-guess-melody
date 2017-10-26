import ResultView from './result-view.js';
import getResult from '../../utils/get-result';

const result = new ResultView(getResult());

result.getResult = () => {
  result.resultObj = getResult();
};

export default result;
