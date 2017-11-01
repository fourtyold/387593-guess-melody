const state = {
  time: 300,
  maxMistakes: 3,
};

const gameData = {
  answerTime: null,
  stat: [],
  mistakes: 0,
  result: null,
  history: []
};

function Question(gameType) {
  this.answers = [];
  this.text = ``;
  if (gameType === QuestionType.ARTIST) {
    this.correctAnswer = null;
    this.src = ``;
  } else {
    this.correctAnswers = [];
  }
}

function ResultObject() {
  this.userResult = null;
  this.userScore = null;
  this.mistakesCnt = null;
  this.totalTime = null;
  this.fastAnswers = null;
  this.successPercent = null;
  this.currentPlace = null;
  this.totalPlace = null;
}

const userAnswer = {
  status: true,
  src: null,
  time: null
};

const gameResult = {
  limit: 1,
  time: 2,
  score: 3
};

const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

export {state, gameData, userAnswer, Question, gameResult, ResultObject, QuestionType};
