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
5 - Spock`)) - 1];
  }
}

class Computer extends Player {
  constructor(name = "Computer"){
    super(name);
    }
    chooseGesture(){
      this.chosenGesture = this.gestureArray[Math.floor(Math.random()*5)]
    }
}

class Game{
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
    let pointsToWin = bestOf / 2 + 0.5;
    alert(`${player.name} challenges ${computer.name} to a best of ${bestOf} game of Rock, Paper, Scissors, Lizard, Spock!
First to ${pointsToWin} points wins!`);
    while(player.points < pointsToWin && computer.points < pointsToWin){
      player.chooseGesture();
      computer.chooseGesture();
      determineRoundWinner();
      announceRoundWinner();
    }
  }
  
  playAgainstHuman(bestOf){
    let player1 = new Human;
    let player2 = new Human;

    let pointsToWin = bestOf / 2 + 0.5;
  }

  determineRoundWinner(player1.chosenGesture, player2.chosenGesture){
    let roundWinner;
    switch(player1.chosenGesture){
      case "Rock":
        switch(player2.chosenGesture){
          case "Rock":
            
            break;
          case "Paper":
            player2.points++;
            roundWinner =
            break;
          case "Scissors":
            
            break;
          case "Lizard":
            
            break;
          case "Spock":
            player2.points++;
            break;
          default:
            break;
        }
        break;
      case "Paper":
        switch(player2.chosenGesture){
          case "Rock":
            
            break;
          case "Paper":
            
            break;
          case "Scissors":
            
            break;
          case "Lizard":
            
            break;
          case "Spock":
            
            break;
          default:
            break;
        }
        break;
      case "Scissors":
        switch(player2.chosenGesture){
          case "Rock":
            
            break;
          case "Paper":
            
            break;
          case "Scissors":
            
            break;
          case "Lizard":
            
            break;
          case "Spock":
            
            break;
          default:
            break;
        }
        break;
      case "Lizard":
        switch(player2.chosenGesture){
          case "Rock":
            
            break;
          case "Paper":
            
            break;
          case "Scissors":
            
            break;
          case "Lizard":
            
            break;
          case "Spock":
            
            break;
          default:
            break;
        }
        break;
      case "Spock":
        switch(player2.chosenGesture){
          case "Rock":
            
            break;
          case "Paper":
            
            break;
          case "Scissors":
            
            break;
          case "Lizard":
            
            break;
          case "Spock":
            
            break;
          default:
            break;
        }
        break;
    }
  }

  announceRoundWinner(player1, player2){
    setDestructiveVerb();
    alert(`${player1.name} chose ${player1.chosenGesture}.
${player2.name} chose ${player2.chosenGesture}.
${this.setDestructivePhrase}`);
  }

  setDestructivePhrase(){
    'Rock bounces off of Rock.'
    'Scissors comes to a stalemate with Scissors.'
    'Paper gets stuck to Paper.'
    'Lizard stares down Lizard.'
    'Spock looks in the mirror and sees Spock.'
    'Rock crushes Scissors'
    'Scissors cuts Paper'
    'Paper covers Rock'
    'Rock crushes Lizard'
    'Lizard poisons Spock'
    'Spock smashes Scissors'
    'Scissors decapitates Lizard'
    'Lizard eats Paper'
    'Paper disproves Spock'
    'Spock vaporizes Rock'
  }
}

let theGame = new Game();


