const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let randomNumber = Math.floor(Math.random() * 100) + 1;
let message = 'Guess a number between 1 and 100.';
let attempts = 0;

app.get('/', (req, res) => {
  res.render('game', { message: message, attempts: attempts });
});

app.post('/guess', (req, res) => {
  const guess = Number(req.body.guess);
  attempts++;

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message = 'Please enter a valid number between 1 and 100.';
  } else if (guess > randomNumber) {
    message = 'Too high! Try again.';
  } else if (guess < randomNumber) {
    message = 'Too low! Try again.';
  } else {
    message = `Correct! You guessed the number ${randomNumber} in ${attempts} attempts.`;
    // Reset the game
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Game is running at http://localhost:${port}`);
});