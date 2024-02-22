'use strict';

// Setting game name

const gameName = 'Guess the word';
document.title = gameName;
document.querySelector('h1').textContent = gameName;
document.querySelector(
  'footer'
).textContent = `${gameName} game created by Osama Elzero and modified by Elsayed Gamal`;

// Setting game options
const settingsButton = document.querySelector('.settings-button');

let tries;
let letters;
let currentTry = 1;
let hints = 2;
let wordToGuess = '';

settingsButton.addEventListener('click', function () {
  letters = parseInt(document.querySelector('#letters').value);
  tries = parseInt(document.querySelector('#tries').value);

  document.querySelector('.settings').classList.add('hidden');

  // Manege words
  let words = [];
  if (letters === 5) {
    words = [
      'Grace',
      'Maple',
      'Unity',
      'Honor',
      'Ample',
      'Witty',
      'Blend',
      'Crane',
      'Hello',
      'World',
    ];
  } else if (letters === 6) {
    words = [
      'Spirit',
      'Serene',
      'Breeze',
      'Polite',
      'Coding',
      'Beacon',
      'Fervor',
      'Mellow',
      'Wisely',
      'Marvel',
    ];
  }

  wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

  let messageArea = document.querySelector('.message');

  // Manage hints
  document.querySelector('.hint span').textContent = hints;
  const hintButton = document.querySelector('.hint');

  hintButton.addEventListener('click', function () {
    if (hints > 0) {
      hints--;
      document.querySelector('.hint span').textContent = hints;
    }
    if (hints === 0) {
      hintButton.disabled = true;
    }

    const enabledInputs = document.querySelectorAll('input:not([disabled])');
    // console.log(enabledInputs);
    const emptyEnabledInputs = Array.from(enabledInputs).filter(
      (input) => input.value === ''
    );
    // console.log(emptyEnabledInputs);

    if (emptyEnabledInputs.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
      const randomInput = emptyEnabledInputs[randomIndex];
      const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
      console.log(randomInput);
      console.log(indexToFill);
      if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
      }
    }
  });

  function generateInputs() {
    const inputsContainer = document.querySelector('.inputs');

    // Create tries
    for (let i = 1; i <= tries; i++) {
      const tryDiv = document.createElement('div');
      tryDiv.classList.add(`try-${i}`);
      tryDiv.innerHTML = `<span>Try ${i}</span>`;

      if (i !== 1) tryDiv.classList.add('disabled');

      // Create inputs
      for (let j = 1; j <= letters; j++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `guess-${i}-letter-${j}`);
        input.setAttribute('maxlength', '1');
        tryDiv.appendChild(input);
      }

      inputsContainer.appendChild(tryDiv);
    }

    // Focus on first inputin first try
    inputsContainer.children[0].children[1].focus();

    // Disable all other tries inputs
    const disabledInputs = document.querySelectorAll('.disabled input');

    disabledInputs.forEach(function (input) {
      input.setAttribute('disabled', true);
    });

    //
    const inputs = document.querySelectorAll('input');
    inputs.forEach(function (input, index) {
      input.addEventListener('input', function () {
        // Convert input to uppercase
        this.value = this.value.toUpperCase();
        const nextInput = inputs[index + 1];
        if (nextInput) nextInput.focus();
      });

      input.addEventListener('keydown', function (e) {
        // console.log(e);
        // ArrowLeft
        // ArrowRight
        // Backspace
        const currentIndex = Array.from(inputs).indexOf(e.target);
        // console.log(currentIndex);
        if (e.key === 'ArrowRight') {
          const nextInput = currentIndex + 1;
          if (nextInput < inputs.length) inputs[nextInput].focus();
        } else if (e.key === 'ArrowLeft') {
          const prevInput = currentIndex - 1;
          if (prevInput >= 0) inputs[prevInput].focus();
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          const prevInput = currentIndex - 1;
          inputs[currentIndex].value = '';
          if (prevInput >= 0) inputs[prevInput].focus();
        } else if (inputs[currentIndex].value) {
          if (currentIndex + 1 < inputs.length)
            inputs[currentIndex + 1].focus();
        }
      });
    });
  }

  const guessButton = document.querySelector('.check');
  guessButton.addEventListener('click', handleGuesses);

  function handleGuesses() {
    let successGuess = true;

    for (let i = 1; i <= letters; i++) {
      const inputField = document.querySelector(
        `#guess-${currentTry}-letter-${i}`
      );
      // console.log(wordToGuess);
      const letter = inputField.value.toLowerCase();
      // console.log(letter);
      const actualLetter = wordToGuess[i - 1];
      // console.log(actualLetter);

      // Game logic
      /*
      in-place 
      not-in-place 
      wrong 
    */
      if (letter === actualLetter) {
        inputField.classList.add('in-place');
      } else if (wordToGuess.includes(letter) && letter !== '') {
        inputField.classList.add('not-in-place');
        successGuess = false;
      } else {
        inputField.classList.add('wrong');
        successGuess = false;
      }
    }

    // Check for win or lose
    if (successGuess) {
      messageArea.innerHTML = `You win the word is <span>${wordToGuess}</span>`;

      // Add disabled class to all divs
      let allTries = document.querySelectorAll('.inputs div');
      allTries.forEach(function (el) {
        el.classList.add('disabled');
        guessButton.disabled = true;
        hintButton.disabled = true;
      });
    } else {
      document.querySelector(`.try-${currentTry}`).classList.add('disabled');
      document
        .querySelectorAll(`.try-${currentTry} input`)
        .forEach(function (el) {
          el.disabled = true;
        });

      if (currentTry < tries) {
        currentTry++;
        document
          .querySelector(`.try-${currentTry}`)
          .classList.remove('disabled');
        document
          .querySelectorAll(`.try-${currentTry} input`)
          .forEach(function (el) {
            el.disabled = false;
          });
        document.querySelector(`.try-${currentTry}`).children[1].focus();
      } else {
        guessButton.disabled = true;
        hintButton.disabled = true;
        messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`;
      }
    }
  }

  generateInputs();
});
