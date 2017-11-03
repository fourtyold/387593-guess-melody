const State = {
  TIME: 300,
  MAX_MISTAKES: 3,
  SLOW_ANSWER: 30,
  MISTAKE_PRICE: 2,
  ANSWERS_NUMBER: 10,
  MAX_SCORE: 20
};

const gameData = {
  answerTime: null,
  stat: [],
  mistakes: 0,
  result: null,
  history: [],
  loadedData: []
};

const GameResult = {
  LIMIT: 0,
  TIME: 1,
  SCORE: 2
};

const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

const NetData = {
  SERVER_URL: `https://es.dump.academy/guess-melody`,
  CRYPT_KEY: `3748`,
  DEFAULT_USERNAME: `Mikhail387593`
};

export {State, gameData, GameResult, QuestionType, NetData};
