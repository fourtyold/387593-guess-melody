import {Question} from '../../data.js';
import getTimer from '../../utils/timer.js';

export default class GameModel {
  constructor(questionList, data) {
    this.questionList = questionList;
    this.data = data;
    this.timer = getTimer(data.state.time, () => {
      this.onTimeOut();
    });
  }

  updateQuestion() {
    this.gameQuestion = null;
    this.gameQuestion = this.getQuestion();
  }

  getQuestion() {
    const thisQuestion = this.questionList[this.data.gameData.stat.length];
    const questionType = thisQuestion.type;
    const gameQuestion = new Question(questionType);
    gameQuestion.text = thisQuestion.question;
    if (questionType === this.data.QuestionType.ARTIST) {
      gameQuestion.src = thisQuestion.src;
      thisQuestion.answers.forEach((it, i) => {
        gameQuestion.answers.push(it);
        if (it.isCorrect) {
          gameQuestion.correctAnswer = i;
        }
      });
    } else {
      const genre = thisQuestion.genre;
      thisQuestion.answers.forEach((it, i) => {
        gameQuestion.answers.push(it);
        if (it.genre === genre) {
          gameQuestion.correctAnswers.push(i);
        }
      });
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
    this.data.gameData.answerTime = this.data.state.time;
    this.timer.value = this.data.state.time;
  }

  getHistory(loadedData) {
    const scoreHistory = [];
    loadedData.forEach((it) => {
      scoreHistory.push(it.score);
    });
    return scoreHistory;
  }

  onArtistAnswer() {}
  playerHandler() {}
  genreFlagsHandler() {}
  playersHandler() {}
  artistAnswerHandler() {}
  genreAnswerHandler() {}
  onTimeOut() {}
}
