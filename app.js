const { allTriviaQuestions } = require('../trivia-app/trivia');

// Elements
const heading = document.getElementById('heading');
const playButton = document.getElementById('play');
const form = document.getElementById('trivia-form');
const multipleChoice = document.getElementById('multiple-choice');
const submitButton = document.getElementById('submit');
const errorMessage = document.getElementById('error');

// Keys for local storage
const QUESTIONS = 'questions';
const CORRECT_ANSWER = 'correct-answer';
const SCORE = 'score';

const deckSize = 5;

playButton.addEventListener('click', () => {
  startGame();
});

function startGame() {
  hideElement(playButton);
  displayElement(form);

  const deck = getQuestionsForOneRound(deckSize);

  setKeyAndValueInLocalStorage(QUESTIONS, deck);
  setKeyAndValueInLocalStorage(SCORE, 0);

  askAQuestion();
}

function hideElement(elem) {
  elem.className = 'hidden';
}

function displayElement(elem) {
  elem.className = '';
}

function getQuestionsForOneRound(numberOfQuestionsPerRound) {
  let questions = [];
  let randomNumber;

  while (questions.length < numberOfQuestionsPerRound) {
    randomNumber = getRandomIntegerLessThan(allTriviaQuestions.length);
    questions.push(allTriviaQuestions.splice(randomNumber, 1)[0]);
  }

  return questions;
}

function getRandomIntegerLessThan(number) {
  return Math.floor(Math.random() * number);
}

function setKeyAndValueInLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function askAQuestion() {
  removeChildren(multipleChoice);

  let [card, deck] = pullTopCardFromDeck();

  setKeyAndValueInLocalStorage(QUESTIONS, deck);
  setKeyAndValueInLocalStorage(CORRECT_ANSWER, card.correct);

  displayTrivia(card);
}

function removeChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function pullTopCardFromDeck() {
  const deck = getCurrentDeck();
  const card = deck.shift();
  return [card, deck];
}

function getCurrentDeck() {
  return JSON.parse(localStorage.getItem(QUESTIONS));
}

function displayTrivia(card) {
  displayText(heading, card.question);
  let choices = card.incorrect;
  choices.push(card.correct);
  displayChoices(choices);
}

function displayText(elem, text) {
  elem.textContent = text;
}

function displayChoices(choices) {
  let radioButton;
  let label;

  choices.forEach(choice => {
    radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'choice';
    radioButton.id = choice;
    radioButton.value = choice;

    label = document.createElement('label');
    label.setAttribute('for', choice);
    label.appendChild(radioButton);
    labelTextNode = document.createTextNode(choice);
    label.appendChild(labelTextNode);

    multipleChoice.appendChild(label);
  });

  form.insertBefore(multipleChoice, submit);
}

submitButton.addEventListener('click', event => {
  event.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  hideElement(errorMessage);
  const selected = document.querySelector('input[name="choice"]:checked');

  if (selected) {
    checkAnswer(JSON.stringify(selected.value));

    if (getCurrentDeckLength() > 0) {
      askAQuestion();
    } else {
      finishGame();
    }
  } else {
    displayElement(errorMessage);
  }
}

function checkAnswer(answer) {
  const correctAnswer = localStorage.getItem(CORRECT_ANSWER);

  if (answer === correctAnswer) {
    let score = getScore();
    setKeyAndValueInLocalStorage(SCORE, score + 1);
  }
}

function getScore() {
  return parseInt(localStorage.getItem(SCORE));
}

function getCurrentDeckLength() {
  return getCurrentDeck().length;
}

function finishGame() {
  hideElement(form);
  displayElement(playButton);

  const score = getScore();
  displayText(
    heading,
    `You got ${score} of ${deckSize} answers correct (${
      (score / deckSize) * 100
    }%).`,
  );
}
