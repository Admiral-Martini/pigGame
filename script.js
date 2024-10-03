'use strict';

// Element selection simplifyer
const score0Element = document.querySelector('#score--0');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Default properties for New Game
score0Element.textContent = 0;
score1Element.textContent = 0;
let activePlayer = 0;
let currentScore = 0;
let isPlaying = true;
let totalScores = [0, 0];
diceElement.classList.add('hidden');

const switchActivePlayer = function () {
  if (isPlaying) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
  }
};

const rollTheDice = function () {
  if (isPlaying) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
};

btnRoll.addEventListener('click', rollTheDice);

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  if (!diceElement.classList.contains('hidden')) {
    diceElement.classList.remove('hidden');
  }
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  isPlaying = true;
  totalScores = [0, 0];
  console.log(totalScores);
  if (
    !document.querySelector(`.player--0`).classList.contains('player--active')
  ) {
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
  }
  score0Element.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  score1Element.textContent = 0;
});
