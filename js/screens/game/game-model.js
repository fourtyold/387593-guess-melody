import {Question} from '../../data.js';
import getTimer from '../../utils/timer.js';

export default class GameModel {
  constructor(questionList, data) {
    this.questionList = questionList;
    this.data = data;
    this.timer = getTimer(data.state.time, this.onTimeOut);
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
    const answer = Object.create(this.data.userAnswer);
    answer.time = this.data.gameData.answerTime - this.timer.value;
    if (answerNumber !== this.gameQuestion.correctAnswer) {
      answer.status = false;
    }
    answer.src = this.gameQuestion.answers[answerNumber].src;
    this.data.gameData.answerTime = this.timer.value;
    return answer;
  }

  getGenreAnswer(answerFlags) {
    const answerLinks = [];
    const answer = Object.create(this.data.userAnswer);
    answer.status = true;
    answer.time = this.data.gameData.answerTime - this.timer.value;
    this.data.gameData.answerTime = this.timer.value;
    Array.from(answerFlags).forEach((it, ind) => {
      if (it.checked) {
        if (this.gameQuestion.correctAnswers.indexOf(ind) === -1) {
          answer.status = false;
        }
        answerLinks.push(this.gameQuestion.answers[ind].src);
      }
    });
    answer.src = answerLinks;
    return answer;
  }

  resetGameData() {
    this.data.gameData.mistakes = 0;
    this.data.gameData.stat = [];
    this.data.gameData.answerTime = this.data.state.time;
  }

  onArtistAnswer() {}
  playerHandler() {}
  genreFlagsHandler() {}
  playersHandler() {}
  artistAnswerHandler() {}
  genreAnswerHandler() {}
  onTimeOut() {}
}
