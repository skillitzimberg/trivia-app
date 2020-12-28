const { allTriviaQuestions } = require('../trivia-app/trivia');

// Elements
const heading = document.getElementById('heading');
const playButton = document.getElementById('play');
const form = document.getElementById('trivia-form');
const multipleChoice = document.getElementById('multiple-choice');
const submitButton = document.getElementById('submit');

// Keys for local storage
const QUESTIONS = 'questions';
const CORRECT_ANSWER = 'correct-answer';
const SCORE = 'score';

const deckSize = 5;

function startGame() {
  hideElement(playButton);

  const deck = getQuestionsForOneRound(deckSize);

  setKeyAndValueInLocalStorage(QUESTIONS, deck);
  setKeyAndValueInLocalStorage(SCORE, 0);

  displayElement(form);

  askAQuestion();
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

function hideElement(elem) {
  elem.className = 'hidden';
}

function displayElement(elem) {
  elem.className = '';
}

function askAQuestion() {
  removeChildren(multipleChoice);

  let [card, deck] = pullFirstCardFromDeck();

  if (Array.isArray(deck)) {
    setKeyAndValueInLocalStorage(QUESTIONS, deck);
    setKeyAndValueInLocalStorage(CORRECT_ANSWER, card.correct);
    displayTrivia(card);
  }
}

function removeChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function pullFirstCardFromDeck() {
  const deck = getCurrentDeck();
  const card = deck.shift();
  setKeyAndValueInLocalStorage(QUESTIONS, deck);
  setKeyAndValueInLocalStorage(CORRECT_ANSWER, card.correct);
  return [card, deck];
}

function getCurrentDeck() {
  return JSON.parse(localStorage.getItem(QUESTIONS));
}

function getCurrentDeckLength() {
  return getCurrentDeck().length;
}

function displayTrivia(card) {
  displayQuestion(card.question);
  let choices = card.incorrect;
  choices.push(card.correct);
  displayChoices(choices);
}

function displayQuestion(question) {
  heading.textContent = question;
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

playButton.addEventListener('click', () => {
  startGame();
});

submitButton.addEventListener('click', event => {
  event.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  const correctAnswer = localStorage.getItem(CORRECT_ANSWER);
  const answer = JSON.stringify(
    document.querySelector('input[name="choice"]:checked').value,
  );

  if (answer == correctAnswer) {
    let score = parseInt(localStorage.getItem(SCORE));
    setKeyAndValueInLocalStorage(SCORE, score + 1);
  }

  const deckLength = getCurrentDeckLength();

  if (deckLength > 0) {
    askAQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  hideElement(form);
  displayElement(playButton);

  const score = localStorage.getItem(SCORE);
  displayQuestion(`You got ${score} of ${deckSize} answers correct.`);
}
