import Question from '../../utils/question.js';
import Timer from '../../utils/timer.js';

export default class GameModel {
  constructor(questionList, data) {
    this.questionList = questionList;
    this.data = data;
    this.timer = new Timer(data.State.TIME, () => {
      this.timeOutHandler();
    });
  }

  updateQuestion() {
    this.gameQuestion = null;
    this.gameQuestion = this._getQuestion();
  }

  _getArtistQuestion(gameQuestion, thisQuestion) {
    gameQuestion.src = thisQuestion.src;
    thisQuestion.answers.forEach((it, i) => {
      gameQuestion.answers.push(it);
      if (it.isCorrect) {
        gameQuestion.correctAnswer = i;
      }
    });
  }

  _getGenreQuestion(gameQuestion, thisQuestion) {
    const genre = thisQuestion.genre;
    thisQuestion.answers.forEach((it, i) => {
      gameQuestion.answers.push(it);
      if (it.genre === genre) {
        gameQuestion.correctAnswers.push(i);
      }
    });
  }
  _getQuestion() {
    const thisQuestion = this.questionList[this.data.gameData.stat.length];
    const questionType = thisQuestion.type;
    const gameQuestion = new Question(questionType);
    gameQuestion.text = thisQuestion.question;
    if (questionType === this.data.QuestionType.ARTIST) {
      this._getArtistQuestion(gameQuestion, thisQuestion);
    } else {
      this._getGenreQuestion(gameQuestion, thisQuestion);
    }
    return gameQuestion;
  }

  getArtistAnswer(artistAnswers, target) {
    const answerNumber = Array.from(artistAnswers).indexOf(target);
    const answer = {};
    answer.time = this.data.gameData.answerTime - this.timer.value;
    answer.status = (answerNumber === this.gameQuestion.correctAnswer);
    this.data.gameData.answerTime = this.timer.value;
    return answer;
  }

  getGenreAnswer(answerFlags) {
    const answerLinks = [];
    const answer = {};
    answer.status = true;
    answer.time = this.data.gameData.answerTime - this.timer.value;
    this.data.gameData.answerTime = this.timer.value;
    this.gameQuestion.correctAnswers.forEach((it) => {
      if (!answerFlags[it].checked) {
        answer.status = false;
      }
    });
    answer.src = answerLinks;
    return answer;
  }

  resetGameData() {
    this.data.gameData.mistakes = 0;
    this.data.gameData.stat = [];
    this.data.gameData.answerTime = this.data.State.TIME;
    this.timer.value = this.data.State.TIME;
  }

  mainAnswerHandler() {}
  playerHandler() {}
  genreFlagsHandler() {}
  playersHandler() {}
  artistAnswerHandler() {}
  genreAnswerHandler() {}
  timeOutHandler() {}

  static getHistory(loadedData) {
    return loadedData.map((it) => {
      return it.score;
    });
  }

}
