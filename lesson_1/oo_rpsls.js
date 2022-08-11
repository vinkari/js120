const readline = require('readline-sync');

const RPSLSGame = {
  maxWins: 5,
  moves: {
    rock: { validInputs: ['r', 'rock'], winsAgainst: ['scissors', 'lizard'] },
    paper: { validInputs: ['p', 'paper'], winsAgainst: ['rock', 'spock'] },
    scissors: { validInputs: ['sc', 'scissors'], winsAgainst: ['paper', 'lizard'] },
    lizard: { validInputs: ['l', 'lizard'], winsAgainst: ['paper', 'spock'] },
    spock: { validInputs: ['sp', 'spock'], winsAgainst: ['rock', 'scissors'] }
  },
  playAgainInputs: ['y', 'yes', 'n', 'no'],

  human: createHuman(),
  computer: createComputer(),
  scoreboard: createScoreboard(),

  prompt(message) {
    console.log(`=> ${message}`);
  },

  displayWelcomeMessage() {
    console.clear();
    this.prompt(`Welcome to ${this.gameTitle()}!`);
    this.prompt(`The first player to win ${this.maxWins} rounds wins the match. Good luck!\n`);
  },

  gameTitle() {
    let moves = Object.keys(this.moves)
      .map(move => move[0].toUpperCase() + move.slice(1).toLowerCase());
    return moves.join(' ');
  },

  isWinner() {
    return this.scoreboard.humanWins === this.maxWins ||
           this.scoreboard.computerWins === this.maxWins;
  },

  getWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let roundWinner;

    if (humanMove === computerMove) {
      roundWinner = 'tie';
      this.scoreboard.ties += 1;
    } else if (this.moves[humanMove].winsAgainst.includes(computerMove)) {
      roundWinner = 'human';
      this.scoreboard.humanWins += 1;
    } else {
      roundWinner = 'computer';
      this.scoreboard.computerWins += 1;
    }

    this.scoreboard.history.humanMoves.push(humanMove);
    this.scoreboard.history.computerMoves.push(computerMove);
    this.scoreboard.history.roundWinners.push(roundWinner);
  },

  displayChoices() {
    console.clear();
    this.prompt(`You chose: ${this.scoreboard.history.humanMoves.at(-1).toUpperCase()}`);
    this.prompt(`Computer chose: ${this.scoreboard.history.computerMoves.at(-1).toUpperCase()}\n`);
  },

  displayWinner() {
    switch (this.scoreboard.history.roundWinners.at(-1)) {
      case 'human':
        this.prompt('You win this round!');
        break;
      case 'computer':
        this.prompt('The computer wins this round!');
        break;
      case 'tie':
        this.prompt('It\'s a tie.');
    }
  },

  displayScore() {
    this.prompt(`Human wins: ${this.scoreboard.humanWins}; ` +
                `Computer wins: ${this.scoreboard.computerWins}; ` +
                `Ties: ${this.scoreboard.ties}\n`);
  },

  displayMatchWinner() {
    this.prompt(this.scoreboard.humanWins === this.maxWins ?
      'Congratulations, you won the match!\n' : 'Sorry, the computer won the match.\n');
  },

  resetScoreboard() {
    this.scoreboard = createScoreboard();
  },

  getPlayAgain() {
    let playAgain;
    this.prompt('Would you like to play again? Enter "y" or "n".');

    while (true) {
      playAgain = readline.question().toLowerCase();
      if (this.playAgainInputs.includes(playAgain)) break;
      this.prompt('Please enter a valid choice.');
    }

    return playAgain;
  },

  playAgain() {
    return this.getPlayAgain()[0] === 'y';
  },

  newMatchGreeting() {
    console.clear();
    this.prompt('New match, good luck!\n');
  },

  displayGoodbyeMessage() {
    console.clear();
    this.prompt(`Thanks for playing ${this.gameTitle()}. Goodbye!`);
  },

  play() {
    this.displayWelcomeMessage();

    while (true) {
      while (!this.isWinner()) {
        this.human.chooseMove();
        this.computer.chooseMove();
        this.getWinner();
        this.displayChoices();
        this.displayWinner();
        this.displayScore();
      }
      this.displayMatchWinner();
      this.resetScoreboard();
      if (!this.playAgain()) break;
      this.newMatchGreeting();
    }

    this.displayGoodbyeMessage();
  },
};

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    minHumanMoveWinPercent: 60,

    chooseMove() {
      let moves = this.generateChoices();
      let randomIndex = Math.floor(Math.random() * moves.length);
      this.move = moves[randomIndex];
    },

    getHumanWinRatesAgainst() {
      let moves = Object.keys(RPSLSGame.moves);
      let computerMoves = RPSLSGame.scoreboard.history.computerMoves;
      let roundWinners = RPSLSGame.scoreboard.history.roundWinners;
      let humanWinRatesAgainst = [];

      moves.forEach(move => {
        let computerPicks = 0;
        let humanWins = 0;

        for (let index = 0; index < computerMoves.length; index++) {
          if (computerMoves[index] === move) {
            computerPicks += 1;
            if (roundWinners[index] === 'human') humanWins += 1;
          }
        }

        let humanWinRate = (humanWins / computerPicks) * 100;
        humanWinRatesAgainst.push({ move: move, humanWinRate: humanWinRate });
      });

      return humanWinRatesAgainst;
    },

    generateChoices() {
      let humanWinRatesAgainst = this.getHumanWinRatesAgainst();
      let computerChoices = [];

      humanWinRatesAgainst.forEach(computerMove => {
        if (computerMove.humanWinRate > this.minHumanMoveWinPercent) {
          computerChoices.push(computerMove.move);
        } else {
          computerChoices.push(computerMove.move, computerMove.move);
        }
      });

      return computerChoices;
    }
  };

  return Object.assign(playerObject, computerObject);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    chooseMove() {
      RPSLSGame.prompt(this.choicesMessage());

      do {
        let choice = readline.question().toLowerCase();
        this.move = this.convertToMove(choice);
      } while (!this.move);
    },

    choicesMessage() {
      let validInputs = [];

      for (let property in RPSLSGame.moves) {
        validInputs.push(RPSLSGame.moves[property].validInputs);
      }

      let stringChoices = validInputs.map(inputs => `"${inputs[0]}" for ${inputs[1]}`);

      return `Choose ${stringChoices.slice(0, -1).join(', ')} or ${stringChoices.at(-1)}.`;
    },

    convertToMove(choice) {
      for (let property in RPSLSGame.moves) {
        if (RPSLSGame.moves[property].validInputs.includes(choice)) {
          return property;
        }
      }

      console.log('Please enter a valid choice.');
      return null;
    },
  };

  return Object.assign(playerObject, humanObject);
}

function createPlayer() {
  return {
    move: null,
  };
}

function createScoreboard() {
  return {
    humanWins: 0,
    computerWins: 0,
    ties: 0,

    history: {
      humanMoves: [],
      computerMoves: [],
      roundWinners: [],
    }
  };
}

RPSLSGame.play();