# Trivia App

## “program to an interface, not an implementation” ~ GoF

The company Tandem posted an apprenticeship position. The application included the challenge of creating a trivia app.

The instructions are in this [PDF](Tandem_SEApprentice_Challenge_2020.pdf).

## Acceptance Criteria

- A round of trivia has 10 Questions.

- All questions are multiple-choice questions.

- Your score does not need to update in real time.

- Results can update on form submit, button click, or any interaction you choose.

- We will provide you with the trivia data such as the questions, correct and incorrect answers via a JSON file.

- A user can view questions.

- Questions with their multiple choice options must be displayed one at a time.

- Questions should not repeat in a round.

- A user can select only 1 answer out of the 4 possible answers.

- The correct answer must be revealed after a user has submitted their answer.

- A user can see the score they received at the end of the round.

## USAGE

- Clone or fork the repo
- `cd` into the repo in your preffered way
- Run `npm install`
- Use Go Live (VS Code) or your preffered way of running the project in a browser. (I've just been opening the file in Chrome and refreshing when needed. And mostly it's all tests right now so not much is happening in the view.)
- Run `npm test` to run the tests.
- If you add logic to `app.js`, run `npm build`, then refresh your browser to see the changes.

The TANDEM requirements:

- A user can view questions.
- Questions with their multiple choice options must be displayed one at a time.
- Questions should not repeat in a round.
- A user can select only 1 answer out of the 4 possible answers.
- The correct answer must be revealed after a user has submitted their answer
- A user can see the score they received at the end of the round

The entities of a trivia game are:

- question/answer set
- a collection of question/answer sets for a game
- is a game an entity? To keep score & hold logic to coordinate the game?

Can a question/answer set be a card?
Can a collection of question/answer sets for a game be called a deck?

What does a card do? Anything?
What does a deck do?

- can it populate itself?
- does it depend on card or are the two entities independent and "orchestrated" by the interactor layer?

The interactors are:

- A user can view questions.
- Questions with their multiple choice options must be displayed one at a time.
- Questions should not repeat in a round.
- A user can select only 1 answer out of the 4 possible answers.
- The correct answer must be revealed after a user has submitted their answer
- A user can see the score they received at the end of the round

The "db" is:

- a collection of all possible question/answer sets

### Article

- my thought processes?
- how did I start?
- backstory?
- let the reader into my brain as I build the app?
- what issues did I run into?
- what do I know now that I didn't when I started?

[How to write a tech article](https://www.freecodecamp.org/news/how-to-write-a-great-technical-blog-post-414c414b67f6/)
[Use writing to sharpen your thinking](https://www.youtube.com/watch?v=65U5byDZ55M)
