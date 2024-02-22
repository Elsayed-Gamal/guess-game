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
}
