import {Question} from './data.js';

const getQuestion = (music, gameType) => {
  // const gameQuestion = Object.create(Object.getPrototypeOf(question));
  const gameQuestion = new Question(gameType);
  const songs = music.slice();
  for (let i = 0; i < gameType; i++) {
    const song = songs.splice(Math.floor(Math.random() * songs.length), 1);
    gameQuestion.answers.push(song[0]);
  }
  if (gameQuestion.correctAnswer === null) {
    gameQuestion.correctAnswer = Math.floor(Math.random() * gameQuestion.answers.length);
  } else {
    const genre = gameQuestion.answers[Math.floor(Math.random() * gameQuestion.answers.length)].genre;
    gameQuestion.answers.forEach((answer, index) => {
      if (answer.genre === genre) {
        gameQuestion.correctAnswers.push(index);
      }
    });

  }
  // console.log(gameQuestion);
  return gameQuestion;
};

export default getQuestion;
