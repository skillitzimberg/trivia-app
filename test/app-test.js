const { expect } = require('chai');

const app = require('../app');

describe('Click the play button', () => {
  let triviaObjects;
  beforeEach(() => {
    triviaObjects = app.getQuestionsForARound();
  });

  it('gets an array of ten trivia objects', () => {
    expect(triviaObjects.length).to.equal(10);
  });

  it('an element in trivia objects are trivia objects ', () => {
    expect(triviaObjects[0]).to.have.property('question');
    expect(triviaObjects[0]).to.have.property('incorrect');
    expect(triviaObjects[0]).to.have.property('correct');
  });
});
