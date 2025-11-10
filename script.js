// 🎮 Game Stats
"use strict";
const stats = {
    wins: 0,
    losses: 0,
    retries: 0,
    rounds: 0,
    streak: 0
  };
  const round = {
    number: Math.floor(Math.random() * 1001),
    guesses: 0,
    maxGuesses: 10
  };

  // Helper: safe element lookup (logs a warning if missing)
  function getEl(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`Element #${id} not found`);
    return el;
  }

  updateStats();

  function updateEmoji(index) {
    // Hide all emojis first
    const images = document.querySelectorAll('.images img');
    images.forEach(img => img.classList.remove('active'));
    // Show the selected emoji
    if (images[index]) {
      images[index].classList.add('active');
    }
  }

  function makeGuess() {
    // Read and validate user input
    const raw = getEl("userGuess")?.value;
    const userGuess = parseInt(raw, 10);
    if (isNaN(userGuess) || userGuess < 0 || userGuess > 1000) {
      feedback("Please enter a number between 0 and 1000!");
      return;
    }

    round.guesses++;
    const guessesEl = getEl("guesses");
    if (guessesEl) guessesEl.textContent = round.guesses;

    if (userGuess === round.number) {
      stats.wins++;
      stats.rounds++;
      stats.streak++;
      feedback(`🎉 Correct! The number was ${round.number}!`);
      updateEmoji(0); // Show happy emoji
      resetRound();
    } else if (round.guesses >= round.maxGuesses) {
      stats.losses++;
      stats.rounds++;
      stats.streak = 0;
      feedback(`❌ You've run out of tries! The number was ${round.number}.`);
      stats.retries++;
      updateEmoji(5); // Show shocked emoji
      resetRound();
    } else {
      const diff = Math.abs(userGuess - round.number);
      const highLow = userGuess > round.number ? "too high" : "too low";
      const evenOdd = round.number % 2 === 0 ? "even" : "odd";
      feedback(`Your guess is ${highLow}. Hint: the number is ${evenOdd}.`);
      
      // Show different emojis based on how close the guess is
      if (diff > 500) {
        updateEmoji(4); // Very far - embarrassed
      } else if (diff > 250) {
        updateEmoji(3); // Far - confused
      } else if (diff > 100) {
        updateEmoji(2); // Getting closer - thinking
      } else {
        updateEmoji(1); // Very close - excited
      }
    }
    updateStats();
  }

  function retryRound() {
    stats.retries++;
    resetRound();
    feedback("🔁 New round started. Guess again!");
    updateStats();
    // Hide all emojis when starting a new round
    const images = document.querySelectorAll('.images img');
    images.forEach(img => img.classList.remove('active'));
  }

  function quitGame() {
    feedback("👋 Thanks for playing! Goodbye!");
    stats.wins = 0;
    stats.losses = 0;
    stats.retries = 0;
    stats.rounds = 0;
    stats.streak = 0;
    resetRound();
    updateStats();
  }

  function resetRound() {
    round.number = Math.floor(Math.random() * 1001);
    round.guesses = 0;
    const guessesEl = getEl("guesses");
    if (guessesEl) guessesEl.textContent = "0";
  }

  function feedback(msg) {
    const el = getEl("feedback");
    if (el) el.textContent = msg;
    else console.log(msg);
  }

  function updateStats() {
    const winsEl = getEl("wins"); if (winsEl) winsEl.textContent = stats.wins;
    const lossesEl = getEl("losses"); if (lossesEl) lossesEl.textContent = stats.losses;
    const retriesEl = getEl("retries"); if (retriesEl) retriesEl.textContent = stats.retries;
    const roundsEl = getEl("rounds"); if (roundsEl) roundsEl.textContent = stats.rounds;
    const streakEl = getEl("streak"); if (streakEl) streakEl.textContent = stats.streak;
  }
