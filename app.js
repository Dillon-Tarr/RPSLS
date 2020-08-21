"use strict";

class Player {
  constructor(name = "Player"){
    this.name = name;
    this.points = 0;
    this.s = '';
    this.gestureArray = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
    this.chosenGesture = null;
  }
}

class Human extends Player {
  constructor(name){
    super(name);
  }
  chooseGesture(){
    this.chosenGesture = this.gestureArray[parseInt(prompt(`${this.name}, enter the number next to the gesture you want to choose.
1 - Rock
2 - Paper
3 - Scissors
4 - Lizard
5 - Spock

else - quit`)) - 1];
  }
}

class Computer extends Player {
  constructor(name = "Computer"){
    super(name);
    }
    chooseGesture(){
      this.chosenGesture = this.gestureArray[Math.floor(Math.random()*5)];
    }
}

class Game{
  constructor(){
    this.againstWhom = null;
    this.player1 = null;
    this.player2 = null;
    this.bestOf = null;
    this.pointsToWin = null;
    this.destructivePhrase = null;
    this.destructivePhrases = ['Rock bounces off of Rock.',
      'Paper gets stuck to Paper.',
      'Scissors permanently interlocks with Scissors.',
      'Lizard stares down Lizard.',
      'Spock looks in the mirror and sees Spock.',
      'Rock crushes Scissors.',
      'Scissors cuts Paper.',
      'Paper covers Rock.',
      'Rock crushes Lizard.',
      'Lizard poisons Spock.',
      'Spock smashes Scissors.',
      'Scissors decapitates Lizard.',
      'Lizard eats Paper.',
      'Paper disproves Spock.',
      'Spock vaporizes Rock.'];
    this.roundWinner = null;
    this.gameWinner = null;
  }

  playGame() {
    this.againstWhom = prompt("Would you like to play single-player or multi-player?\n\nEnter '1' for single-player or '2' to play with a friend.");
    this.createPlayers();

    this.bestOf = parseInt(prompt("What is the maximum number of rounds you want to play to determine the winner?\nThat is, \"best of\" how many games?\n\nEnter an odd number - at least '3'"));
    if (this.bestOf % 2 == 0) {
      this.bestOf--;
    }
    this.pointsToWin = this.bestOf / 2 + 0.5;

    alert(`${this.player1.name} challenges ${this.player2.name} to a best-of-${this.bestOf} game of...
Rock, Paper, Scissors, Lizard, Spock!
    
First to ${this.pointsToWin} points wins!`);

    while(this.player1.points < this.pointsToWin && this.player2.points < this.pointsToWin){
      this.player1.chooseGesture();
      if (this.player1.chosenGesture == undefined){
        throw(`${this.player1.name} quit.`);
      }
      this.player2.chooseGesture();
      if (this.player2.chosenGesture == undefined){
        throw(`${this.player2.name} quit.`);
      }
      this.determineRoundWinner();
      this.announceRoundWinner();
    }
    this.determineGameWinner();
    this.announceGameWinner();
  }
  
  createPlayers(){
    if (this.againstWhom === '1'){
      this.player1 = new Human(prompt("What is your name?"));
      this.player2 = new Computer("Computer");
    }
    else if (this.againstWhom === "2"){
      this.player1 = new Human(prompt("What is player 1's name?"));
      this.player2 = new Human(prompt("What is player 2's name?"));
    }
  }

  determineRoundWinner(){
    switch(this.player1.chosenGesture){
      case "Rock":
        switch(this.player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(0);
            this.roundWinner = 'No one.';
            break;
          case "Paper":
            this.setDestructivePhrase(7);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Scissors":
            this.setDestructivePhrase(5);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Lizard":
            this.setDestructivePhrase(8);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Spock":
            this.setDestructivePhrase(14);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          default:
            this.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Paper":
        switch(this.player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(7);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Paper":
            this.setDestructivePhrase(1);
            this.roundWinner = 'No one.';
            break;
          case "Scissors":
            this.setDestructivePhrase(6);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Lizard":
            this.setDestructivePhrase(12);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Spock":
            this.setDestructivePhrase(13);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          default:
            this.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Scissors":
        switch(this.player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(5);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Paper":
            this.setDestructivePhrase(6);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Scissors":
            this.setDestructivePhrase(2);
            this.roundWinner = 'No one.';
            break;
          case "Lizard":
            this.setDestructivePhrase(11);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Spock":
            this.setDestructivePhrase(10);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          default:
            this.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Lizard":
        switch(this.player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(8);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Paper":
            this.setDestructivePhrase(12);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Scissors":
            this.setDestructivePhrase(11);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Lizard":
            this.setDestructivePhrase(3);
            this.roundWinner = 'No one.';
            break;
          case "Spock":
            this.setDestructivePhrase(9);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          default:
            this.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Spock":
        switch(this.player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(14);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Paper":
            this.setDestructivePhrase(13);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Scissors":
            this.setDestructivePhrase(10);
            this.player1.points++;
            this.roundWinner = `${this.player1.name}`;
            break;
          case "Lizard":
            this.setDestructivePhrase(9);
            this.player2.points++;
            this.roundWinner = `${this.player2.name}`;
            break;
          case "Spock":
            this.setDestructivePhrase(4);
            this.roundWinner = 'No one.';
            break;
          default:
            this.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      default:
        this.roundWinner = 'ERROR!!!';
        break;
    }
  }

  setDestructivePhrase(index){
    this.destructivePhrase = this.destructivePhrases[index];
  }

  announceRoundWinner(){
    let gamePointText = "";
    if(this.player1.points === this.pointsToWin || this.player2.points === this.pointsToWin){
      gamePointText = "\nIt is decided.";
    }
    else if (this.player1.points === this.pointsToWin - 1 && this.player2.points === this.pointsToWin - 1){
      gamePointText = "\nLast point! It could go either way!";
    }
    else if (this.player1.points === this.pointsToWin - 1){
      gamePointText = `\nThis could be the last one! Can ${this.player2.name} catch up?`;
    }
    else if (this.player2.points === this.pointsToWin - 1){
      gamePointText = `\nThis could be the last one! Can ${this.player1.name} catch up?`;
    }
    this.determineSs();
    alert(`${this.player1.name} chose ${this.player1.chosenGesture}. ${this.player2.name} chose ${this.player2.chosenGesture}.
${this.destructivePhrase}
This round's winner is: ${this.roundWinner}

Points needed to win: ${this.pointsToWin}

${this.player1.name} has ${this.player1.points} point${this.player1.s}.
${this.player2.name} has ${this.player2.points} point${this.player2.s}.${gamePointText}`);
  }

  determineSs(){
    if(this.player1.points < 3 || this.player2.points < 3){
      if (this.player1.points === 1){
        this.player1.s = '';
      }
      else {
        this.player1.s = 's';
      }
      if (this.player2.points === 1){
        this.player2.s = '';
      }
      else {
        this.player2.s = 's';
      }
    }
  }

  determineGameWinner(){
    if(this.player1.points === this.pointsToWin){
    this.gameWinner = this.player1.name;
    }
    else if(this.player2.points === this.pointsToWin){
    this.gameWinner = this.player2.name;
    }
  }

  announceGameWinner(){
    alert(`This game's winner is... ${this.gameWinner}!`)
  }
}

let theGame = new Game();


