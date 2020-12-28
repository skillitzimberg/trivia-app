(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  // setKeyAndValueInLocalStorage(QUESTIONS, deck);
  // setKeyAndValueInLocalStorage(CORRECT_ANSWER, card.correct);
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
    const answer = JSON.stringify(selected.value);
    const correctAnswer = localStorage.getItem(CORRECT_ANSWER);

    if (answer == correctAnswer) {
      let score = parseInt(localStorage.getItem(SCORE));
      setKeyAndValueInLocalStorage(SCORE, score + 1);
    }

    if (getCurrentDeckLength() > 0) {
      askAQuestion();
    } else {
      finishGame();
    }
  } else {
    displayElement(errorMessage);
  }
}

function getCurrentDeckLength() {
  return getCurrentDeck().length;
}

function finishGame() {
  hideElement(form);
  displayElement(playButton);

  const score = localStorage.getItem(SCORE);
  displayText(
    heading,
    `You got ${score} of ${deckSize} answers correct (${
      (score / deckSize) * 100
    }%).`,
  );
}

},{"../trivia-app/trivia":2}],2:[function(require,module,exports){
const allTriviaQuestions = [
  {
    question: 'What was Tandem‘s previous name?',
    incorrect: ['Tandem', 'Burger Shack', 'Extraordinary Humans'],
    correct: 'Devmynd',
  },
  {
    question:
      "In Shakespeare's play Julius Caesar, Caesar's last words were...",
    incorrect: ['Iacta alea est!', 'Vidi, vini, vici', 'Aegri somnia vana'],
    correct: 'Et tu, Brute?',
  },
  {
    question: 'A group of tigers are referred to as:',
    incorrect: ['Chowder', 'Pride', 'Destruction'],
    correct: 'Ambush',
  },
  {
    question: 'What is the top speed an average cat can travel?',
    incorrect: ['42 mph', '13 mph', '9 mph'],
    correct: '31 mph',
  },
  {
    question: 'A cat can jump to _____ times its own height:',
    incorrect: ['3', '9', '7'],
    correct: '5',
  },
  {
    question: "What is the only letter that doesn't appear in a US state name?",
    incorrect: ['M', 'Z', 'X'],
    correct: 'Q',
  },
  {
    question: 'What is the name for a cow-bison hybrid?',
    incorrect: ['Cowson', 'Bicow', 'Mooson'],
    correct: 'Beefalo',
  },
  {
    question: 'What is the largest freshwater lake in the world?',
    incorrect: ['Lake Baikal', 'Lake Michigan', 'Lake Victoria'],
    correct: 'Lake Superior',
  },

  {
    question: 'In a website address bar, what does WWW stand for?',
    incorrect: ['Wild Wild West', 'War World Web'],
    correct: 'World Wide Web',
  },
  {
    question:
      'In a game of bingo, what number is represented by the name two little ducks?',
    incorrect: ['20', '55', '77'],
    correct: '22',
  },
  {
    question: 'According to Greek mythology, who was the first woman on Earth?',
    incorrect: ['Lilith', 'Eve', 'Hera'],
    correct: 'Pandora',
  },
  {
    question: 'In which European city would you find Orly airport?',
    incorrect: ['London', 'Belgium', 'Munich'],
    correct: 'Paris',
  },
  {
    question: 'Where would you find the Sea of Tranquility?',
    incorrect: ['California', 'Siberia', 'China'],
    correct: 'The Moon',
  },
  {
    question: "Which artist painted 'Girl with a Pearl Earrin'?",
    incorrect: ['Van Gogh', 'Picasso', 'Da Vinci'],
    correct: 'Vermeer',
  },
  {
    question: "What is the official name for the 'hashtag' symbol?",
    incorrect: ['Number sign', 'Hash Sign', 'Pound'],
    correct: 'Octothorpe',
  },
  {
    question: 'Not American at all, where is apple pie from?',
    incorrect: ['Japan', 'Ethiopia', 'Canada'],
    correct: 'England',
  },
  {
    question: 'What is the national animal of Scotland?',
    incorrect: ['Bear', 'Rabbit', 'Seal'],
    correct: 'Unicorn',
  },
  {
    question:
      'Where in the world is the only place where Canada is *due south*',
    incorrect: ['Alaska', 'Russia', 'Washington'],
    correct: 'Detroit',
  },
  {
    question: 'Approximately how many grapes go into a bottle of wine?',
    incorrect: ['500', '200', '1000'],
    correct: '700',
  },
  {
    question: 'How much does a US One Dollar Bill cost to make?',
    incorrect: ['$0.25', '$1', '$5'],
    correct: '$0.05',
  },
  {
    question:
      'The Vatican bank has the only ATM in the world that allows users to do what?',
    incorrect: [
      'Receive withdrawls in rosary beads',
      'Vote for the Pope',
      'Purchase indulgences',
    ],
    correct: 'Perform transactions in Latin',
  },
];

exports.allTriviaQuestions = allTriviaQuestions;

},{}]},{},[1]);
