const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { setInnerHTML } = require('../dom.js');
const triviaCollection = require('../trivia');

beforeEach(() => {
  let mockDom = new JSDOM(
    `<body>
    <div id="overlay">
      <main id="console">
        <header>
          <h1 id='heading'>TRIVIA!!!</h1>
        </header>
  
        <form method="POST" id='trivia-form'>
        </form>
      </main>
  
    </div>
  </body>`,
  );

  global.window = mockDom.window;
  global.document = mockDom.window.document;
});

describe('setInnerHTML()', () => {
  it('sets an element‘s inner HTML to the given string.', () => {
    // Arrange
    const elementId = 'heading';
    const newHeadingText = 'New Heading!!!';
    const heading = document.getElementById(elementId);

    // Act
    setInnerHTML(elementId, newHeadingText);

    // Assert
    const updatedHeading = document.getElementById(elementId);
    expect(updatedHeading.innerHTML).to.equal('New Heading!!!');
  });
});
