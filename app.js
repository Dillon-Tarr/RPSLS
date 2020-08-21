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
    super();
  }
  chooseGesture(){

  }
}

class Computer extends Player {
  constructor(){
    super();
    }
    chooseGesture(){

    }
}

class Game{
  playGame(bestOf, againstWhom) {
    if (againstWhom == "computer"){
      return this.playAgainstComputer(bestOf);
    }
    if (againstWhom == "human"){
       return this.playAgainstHuman(bestOf);
    }
  }
  
  playAgainstComputer(bestOf){
    let player = new Human;
    let computer = new Computer;
    let pointsToWin = bestOf / 2 + 0.5;
    console.log(`You will now play against the computer. First to ${pointsToWin} points wins!`);
  }
  
  playAgainstHuman(bestOf){
    let player1 = new Human;
    let player2 = new Human;

    let pointsToWin = bestOf / 2 + 0.5;
  }
}

let theGame = new Game();


