const state = {
  time: 300,
  maxMistakes: 3,
  artist: 3,
  genre: 4,
  artistScreens: 5,
  totalScreens: 10
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
  if (gameType === state.artist) {
    this.text = `Кто исполняет эту песню?`;
    this.correctAnswer = null;
  } else {
    this.text = [`Выберите `, ` треки`];
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

const musicList = [
  {
    artist: `Kevin MacLeod`,
    name: `EDM Detection Mode`,
    image: `https://images.shazam.com/coverart/t305110032-b1069337855_s400.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=73bb411d4b08c064`,
    genre: `Electro`
  },
  {
    artist: `Silent Partner`,
    name: `Bounce It`,
    image: `https://i.ytimg.com/vi/Y1f5FYL1LVM/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=0c10e1cd3f05ce2e`,
    genre: `Hip-hop&Rap`
  },
  {
    artist: `Chris Zabriskie`,
    name: `Prelude No. 1`,
    image: `https://i.ytimg.com/vi/Dm6N3x2zWQQ/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=d87e56b7a92a1441`,
    genre: `Classic`
  },
  {
    artist: `Silent Partner`,
    name: `Jon's On Fire`,
    image: `https://i.ytimg.com/vi/gQvd7rS6lqA/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=46e7ebd0de480f8a`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Periscope`,
    image: `https://i.ytimg.com/vi/gIqx9mLStsY/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=b9c7ad3b0c832264`,
    genre: `Alternative&Punk`
  }
];

export {state, gameData, musicList, userAnswer, Question, gameResult, ResultObject};
