# Trivia App

## “program to an interface, not an implementation” ~ GoF

The company Tandem posted an apprenticeship position. The application included the challenge of creating a trivia app.

The instructions are in this [PDF](Tandem_SEApprentice_Challenge_2020.pdf).

I am trying to build this using TDD and incorporating Robert C. Martin's concept of clean architecture.

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

Your request number is CUL519405169258. Use it and your IMEI to check the status of your device unlock request.
Heads up: It may take up to 48 hours to process your request.

If a problem is broken down in such a way so that the "how is a task accomplished in the real world" and "how are those tasks accomplished in a computer", do you end up with clean architecture?

- "how is a task accomplished in the real world" is at the entity layer;
- "how are those tasks accomplished in a computer" is the interactor layer

These decomposition questions can be rephrased as test cases. They may also point to entity names and methods.

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
