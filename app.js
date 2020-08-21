"use strict";

let interactiveContent = document.getElementById("interactiveWindow");

class Player {
  constructor(name = "Player"){
    this.name = name;
    this.points = 0;
    this.gestureArray = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
    this.chosenGesture = null;
  }
}

class Human extends Player {
  constructor(name){
    super(name);
  }
  chooseGesture(){
    this.chosenGesture = this.gestureArray[parseInt(prompt(`Enter the number next to the gesture you want to choose.
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
    this.destructivePhrase = null;
  }

  playGame() {
    let againstWhom = prompt("Would you like to play single-player or multi-player?\n\nEnter '1' for single-player or '2' to play with a friend.");
    let bestOf = parseInt(prompt("What is the maximum number of rounds you want to play to determine the winner?\nThat is, \"best of\" how many games?\n\nEnter an odd number - at least '3'"));
    if (bestOf % 2 == 0) {
      bestOf--;
    }
    if (againstWhom === '1'){
      return this.playAgainstComputer(bestOf);
    }
    else if (againstWhom === "2"){
       return this.playAgainstHuman(bestOf);
    }
  }
  
  playAgainstComputer(bestOf){
    let player = new Human("Player");
    let computer = new Computer("Computer");
    this.pointsToWin = bestOf / 2 + 0.5;
    alert(`${player.name} challenges ${computer.name} to a best-of-${bestOf} game of
Rock, Paper, Scissors, Lizard, Spock!

First to ${this.pointsToWin} points wins!`);
    while(player.points < this.pointsToWin && computer.points < this.pointsToWin){
      player.chooseGesture();
      computer.chooseGesture();
      if (player.chosenGesture == undefined){
        throw('User quit.');
      }
      let roundWinner = this.determineRoundWinner(player, computer);
      this.announceRoundWinner(player, computer, roundWinner);
    }
    let gameWinner = this.determineGameWinner(player, computer);
    this.announceGameWinner(gameWinner);
  }
  
  playAgainstHuman(bestOf){
    let player1 = new Human;
    let player2 = new Human;

    this.pointsToWin = bestOf / 2 + 0.5;
  }

  determineRoundWinner(player1, player2){
    switch(player1.chosenGesture){
      case "Rock":
        switch(player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(0);
            return 'No one.';
          case "Paper":
            this.setDestructivePhrase(7);
            player2.points++;
            return `${player2.name}`;
          case "Scissors":
            this.setDestructivePhrase(5);
            player1.points++;
            return `${player1.name}`;
          case "Lizard":
            this.setDestructivePhrase(8);
            player1.points++;
            return `${player1.name}`;
          case "Spock":
            this.setDestructivePhrase(14);
            player2.points++;
            return `${player2.name}`;
          default:
            return 'error';
        }
      case "Paper":
        switch(player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(7);
            player1.points++;
            return `${player1.name}`;
          case "Paper":
            this.setDestructivePhrase(1);
            return 'No one.';
          case "Scissors":
            this.setDestructivePhrase(6);
            player2.points++;
            return `${player2.name}`;
          case "Lizard":
            this.setDestructivePhrase(12);
            player2.points++;
            return `${player2.name}`;
          case "Spock":
            this.setDestructivePhrase(13);
            player1.points++;
            return `${player1.name}`;
          default:
            return 'error';
        }
      case "Scissors":
        switch(player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(5);
            player2.points++;
            return `${player2.name}`;
          case "Paper":
            this.setDestructivePhrase(6);
            player1.points++;
            return `${player1.name}`;
          case "Scissors":
            this.setDestructivePhrase(2);
            return 'No one.';
          case "Lizard":
            this.setDestructivePhrase(11);
            player1.points++;
            return `${player1.name}`;
          case "Spock":
            this.setDestructivePhrase(10);
            player2.points++;
            return `${player2.name}`;
          default:
            return 'error';
        }
      case "Lizard":
        switch(player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(8);
            player2.points++;
            return `${player2.name}`;
          case "Paper":
            this.setDestructivePhrase(12);
            player1.points++;
            return `${player1.name}`;
          case "Scissors":
            this.setDestructivePhrase(11);
            player2.points++;
            return `${player2.name}`;
          case "Lizard":
            this.setDestructivePhrase(3);
            return 'No one.';
          case "Spock":
            this.setDestructivePhrase(9);
            player1.points++;
            return `${player1.name}`;
          default:
            return 'error';
        }
      case "Spock":
        switch(player2.chosenGesture){
          case "Rock":
            this.setDestructivePhrase(14);
            player1.points++;
            return `${player1.name}`;
          case "Paper":
            this.setDestructivePhrase(13);
            player2.points++;
            return `${player2.name}`;
          case "Scissors":
            this.setDestructivePhrase(10);
            player1.points++;
            return `${player1.name}`;
          case "Lizard":
            this.setDestructivePhrase(9);
            player2.points++;
            return `${player2.name}`;
          case "Spock":
            this.setDestructivePhrase(4);
            return 'No one.';
          default:
            return 'error';
        }
      default:
        return 'error';
    }
  }

  announceRoundWinner(player1, player2, roundWinner){
    let gamePointText = "";
    if(player1.points === this.pointsToWin || player2.points === this.pointsToWin){
      gamePointText = "\nIt is decided.";
    }
    else if (player1.points === this.pointsToWin - 1 && player2.points === this.pointsToWin - 1){
      gamePointText = "\nLast point! It could go either way!";
    }
    else if (player1.points === this.pointsToWin - 1){
      gamePointText = `\nThis could be the last one! Can ${player2.name} catch up?`;
    }
    else if (player2.points === this.pointsToWin - 1){
      gamePointText = `\nThis could be the last one! Can ${player1.name} catch up?`;
    }
    alert(`${player1.name} chose ${player1.chosenGesture}. ${player2.name} chose ${player2.chosenGesture}.
${this.destructivePhrase}
This round's winner is: ${roundWinner}

Points needed to win: ${this.pointsToWin}

${player1.name} has ${player1.points} points.
${player2.name} has ${player2.points} points.${gamePointText}`);
  }

  setDestructivePhrase(index){
    this.destructivePhrase = this.destructivePhrases[index];
  }

  determineGameWinner(player1, player2){
    if(player1.points === this.pointsToWin){
    return player1.name;
    }
    else if(player2.points === this.pointsToWin){
    return player2.name;
    }
  }

  announceGameWinner(gameWinner){
    alert(`This game's winner is... ${gameWinner}!`)
  }
}

let theGame = new Game();


