class Game {
  constructor(name, player1, player2, numberOfRounds) {
    this._name = name;
    this._round = 1;
    this._player1 = new Player(player1);
    this._player2 = new Player(player2);
    this._possiblemoves = ["rock", "paper", "scissors"];
    this._numberOfRounds = numberOfRounds;
  }

  evaluate() {
    let p1 = this._player1._lastmove;
    let p2 = this._player2._lastmove;
    if (p1 === p2) {
      console.log("It's a draw");
    } else {
      let p1win =
        (p1 === "rock" && p2 === "scissors") ||
        (p1 === "scissors" && p2 === "paper") ||
        (p1 === "paper" && p2 === "rock");
      if (p1win) {
        this._player1._score.wins += 1;
        this._player2._score.losses += 1;
        console.log(`In round ${this._round} ${this._player1._name} wins!`);
      } else {
        this._player2._score.wins += 1;
        this._player1._score.losses += 1;
        console.log(`In round ${this._round} ${this._player2._name} wins!`);
      }
      this._round += 1;
    }
  }
  randomizeMoves() {
    let p1Move = this._possiblemoves[Math.floor(Math.random() * 3)];
    let p2Move = this._possiblemoves[Math.floor(Math.random() * 3)];
    this._player1.playermove(p1Move);
    this._player2.playermove(p2Move);
  }
  showGameStats() {
    console.log(
      `${this._player1._name} recorded ${this._player1._score.wins} wins and ${
        this._player1._score.losses
      } losses.`
    );
    console.log(
      `${this._player2._name} recorded ${this._player2._score.wins} wins and ${
        this._player2._score.losses
      } losses.`
    );
  }
  gameRound() {
    this.randomizeMoves();
    this.evaluate();
    this.showGameStats();
  }
  gameLoop() {
    let round = this._round;
    while (round <= this._numberOfRounds) {
      this.gameRound();
      round = this._round;
    }
  }
}

class Player {
  constructor(name, score) {
    this._name = name;
    this._score = {
      wins: 0,
      losses: 0
    };
    this._lastmove = "";
  }
  playermove(move) {
    this._lastmove = new Move(move)._name;
    console.log(`${this._name} showed ${this._lastmove}.`);
  }
}

class Move {
  constructor(name) {
    this._name = name;
  }
}

/* Let the games begin 
   May the force be with you
*/

// create players
const player1 = "Lionel Messi";
const player2 = "Toni Kroos";

// players join game
// params: game name, player 1 name, player 2 name, no. of rounds to be played
const myGame = new Game("Rock/Paper/Scissors", player1, player2, 5);

//start the game
myGame.gameLoop();
