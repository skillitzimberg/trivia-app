const { expect } = require('chai');
const {
  getNextQuestion,
  getRandomIntegerLessThan,
  getAnswerSet,
} = require('../game.js');

let stubCollection = [];

beforeEach(() => {
  stubCollection = [
    {
      question: 'Am I a question!',
      incorrect: ["I'm right!", "No, I'm right", "You're both liars! It's me!"],
      correct: "I'm correct, but no one knows about what.",
    },
  ];
});

describe('Set up a trivia question', () => {
  it('getNextQuestion() returns a trivia question object.', () => {
    // Arrange

    const typeOfString = typeof 'A random string';
    const typeOfArray = [];

    // Act
    const triviaObj = getNextQuestion(stubCollection);

    //Assert
    expect(typeof triviaObj.question).to.equal(typeOfString);
    expect(Array.isArray(triviaObj.incorrect)).to.equal(
      Array.isArray(typeOfArray),
    );
    expect(typeof triviaObj.correct).to.equal(typeOfString);
  });

  it('creates an array of correct and incorrect answers.', () => {
    // Arrange
    const triviaObj = getNextQuestion(stubCollection);
    // Act
    const answers = getAnswerSet(triviaObj);
    // Assert
    expect(answers.length).to.be.greaterThan(triviaObj.incorrect.length);
  });
});

describe('get a random number', () => {
  it('getRandomIntegerLessThan(someInteger) returns a random number where 0 <= random number <= the integer argument.', () => {
    // Act
    const randomNumber = getRandomIntegerLessThan(5);

    // Assert
    expect(Number.isInteger(randomNumber)).to.equal(Number.isInteger(5));
    expect(randomNumber).to.be.lessThan(5);
  });
});
