"use strict";

let interactiveContent = document.getElementById("interactiveWindow");

class Player {
  constructor(name){
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
  mainMenu(){
    interactiveContent.innerHTML =
    `<form id="form" name="form">
    I want to play best of
    <label for="bestOf"><input id="bestOf" name="bestOf" type="number" class="numberInput" value="3" min="3" step="2" max="23"></label> against 
    <label for="againstWhom"><select id="againstWhom" name="againstWhom" class="dropdownInput">
      <option value="computer">the computer</option>
      <option value="human">the person next to me</option>
    </select></label>.<br>
    <div class="buttonHolder"><label for="start"><input id="startButton" type="submit" name="start" value="Start!"></label></div>
  </form>`;
    let form = document.getElementById("form");
    form.onsubmit = function(e) {
      e.preventDefault();
      let bestOf = form.bestOf.value;
      let againstWhom = form.againstWhom.value;
      this.playGame(bestOf, againstWhom);
    }
  } 
  
  playGame(bestOf, againstWhom) {
    if (againstWhom == "computer"){
      return playAgainstComputer(bestOf);
    }
    if (againstWhom == "human"){
       return playAgainstHuman(bestOf);
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
    this.playerOne.chooseGesture();
    this.playerTwo.chooseGesture();
    let pointsToWin = bestOf / 2 + 0.5;
    console.log(`You will now play against each other. First to ${pointsToWin} points wins!`);
  }
}

let theGame = new Game();


