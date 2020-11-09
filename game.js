function getNextQuestion(triviaCollection) {
  const randomNumber = getRandomIntegerLessThan(triviaCollection.length);

  return triviaCollection.splice(randomNumber, 1)[0];
}

function getRandomIntegerLessThan(cieling) {
  return Math.floor(Math.random(cieling));
}

function getAnswerSet(triviaObj) {
  let answers = JSON.parse(JSON.stringify(triviaObj.incorrect));

  answers.push(triviaObj.correct);
  return answers;
}

exports.getNextQuestion = getNextQuestion;
exports.getRandomIntegerLessThan = getRandomIntegerLessThan;
exports.getAnswerSet = getAnswerSet;
