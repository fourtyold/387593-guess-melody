import {QuestionType} from '../data.js';

export default class Question {

  constructor(gameType) {
    this.answers = [];
    this.text = ``;
    this.type = gameType;
    if (gameType === QuestionType.ARTIST) {
      this.correctAnswer = null;
      this.src = ``;
    } else {
      this.correctAnswers = [];
    }
  }
}
