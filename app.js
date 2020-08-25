"use strict";

let interactiveContent = document.getElementById("interactiveWindow");

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
    this.validateName();
    this.gesturePromptText = `${this.name}, enter the number next to the gesture you want to choose.

1 - Rock
2 - Paper
3 - Scissors
4 - Lizard
5 - Spock

q - quit`;
    this.gestureIsValid;
    this.gestureInput;
  }

  validateName(){
    if (this.name === ''){
      this.name = prompt('Surely you must have a name. What is it?');
    }
    if (this.name === null || this.name === undefined || this.name === ''){
      throw('Nameless person quit.');
    }
  }

  chooseGesture(){
    this.gestureIsValid = false;
    this.gestureInput = prompt(this.gesturePromptText);
    this.validateGestureInput();
    this.chosenGesture = this.gestureArray[parseInt(this.gestureInput) - 1];
  }

  validateGestureInput(){
    switch(this.gestureInput){
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        this.gestureIsValid = true;
        break;
      case 'q':
      case 'Q':
      case 'quit':
      case 'Quit':
        throw(`${this.name} quit.`);
      default:
        alert('Your selection was not valid.');
        this.chooseGesture();
        break;
    }
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
    this.destructivePhrases = ['Rock leaves a slight scratch on Rock.',
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
      this.interactiveContent = document.getElementById("interactiveWindow");
  }

  setMainMenu(){
    interactiveContent.innerHTML =
    `<form id="form" name="form">
    I want to play best of
    <label for="bestOf"><input id="bestOf" name="bestOf" type="number" class="numberInput" value="3" min="3" step="2" max="99"></label> against 
    <label for="againstWhom"><select id="againstWhom" name="againstWhom" class="dropdownInput">
      <option value="computer">the computer</option>
      <option value="human">the person next to me</option>
    </select></label>.<br>
    <div class="buttonHolder"><label for="start"><input id="startButton" type="submit" name="start" value="Start!"></label></div>
  </form>`;
    let form = document.getElementById("form");
    form.onsubmit = function(e) {
      e.preventDefault();
      theGame.bestOf = form.bestOf.value;
      theGame.pointsToWin = theGame.bestOf / 2 + 0.5;
      theGame.againstWhom = form.againstWhom.value;
      theGame.playGame();
    }
  }

  playGame() {
    theGame.createPlayers();
    theGame.announceStartOfGame();
    do {
      theGame.player1.chooseGesture();
      theGame.player2.chooseGesture();
      theGame.determineRoundWinner();
      theGame.announceRoundWinner();
    } while (theGame.player1.points < theGame.pointsToWin && theGame.player2.points < theGame.pointsToWin); // theGame.pointsToWin is established in theGame.determineBestOf()
    theGame.determineGameWinner();
    theGame.announceGameWinner();
  }
  
  determineAgainstWhom(){
    do {
      theGame.againstWhom = prompt("Would you like to play single-player or multi-player?\n\nEnter '1' for single-player or '2' to play with a friend.");
      if (theGame.againstWhom === null || theGame.againstWhom === undefined || theGame.againstWhom === ''){
        throw('User did not want to play.');
      }
    }
    while (theGame.againstWhom !== '1' && theGame.againstWhom !== '2');
  }

  createPlayers(){
    if (theGame.againstWhom === 'computer'){
      theGame.whatIsYourName('your');
      theGame.player1 = new Human(prompt("What is your name?"));
      theGame.player2 = new Computer("Computer");
    }
    else if (theGame.againstWhom === "human"){
      theGame.player1 = new Human(prompt("What is player 1's name?"));
      theGame.player2 = new Human(prompt("What is player 2's name?"));
    }
  }

  whatIsYourName(unnamedPlayersName){
    interactiveContent.innerHTML =
    `<form id="form" name="form">
    What is ${unnamedPlayersName} name? <label for="playerName"><input type="text" name="playerName"></label>
    <div class="buttonHolder"><label for="start"><input id="startButton" type="submit" name="start" value="Start!"></label></div>
  </form>`;
    let form = document.getElementById("form");
    form.onsubmit = function(e) {
      e.preventDefault();
      theGame.playerName = form.playerName.value;
      theGame.playGame();
    }
  }

  determineBestOf(){
    do {
      theGame.bestOf = prompt(`What is the maximum number of rounds you want to play to determine the winner?
That is, "best of" how many games?

Enter an ODD number - at least '3'`);
      if (theGame.bestOf === null || theGame.bestOf === undefined || theGame.bestOf === ''){
        throw('User did not want to play.');
      }
      theGame.bestOf = parseInt(theGame.bestOf);
    }
    while (!(((theGame.bestOf + 1) % 2 === 0) && (theGame.bestOf >= 3)));
    theGame.pointsToWin = theGame.bestOf / 2 + 0.5;
  }

  announceStartOfGame(){
    alert(`${theGame.player1.name} challenges ${theGame.player2.name} to a best-of-${theGame.bestOf} game of...
Rock, Paper, Scissors, Lizard, Spock!

First to ${theGame.pointsToWin} points wins!`);
  }

  determineRoundWinner(){
    switch(theGame.player1.chosenGesture){
      case "Rock":
        switch(theGame.player2.chosenGesture){
          case "Rock":
            theGame.setDestructivePhrase(0);
            theGame.roundWinner = 'No one.';
            break;
          case "Paper":
            theGame.setDestructivePhrase(7);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Scissors":
            theGame.setDestructivePhrase(5);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Lizard":
            theGame.setDestructivePhrase(8);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Spock":
            theGame.setDestructivePhrase(14);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          default:
            theGame.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Paper":
        switch(theGame.player2.chosenGesture){
          case "Rock":
            theGame.setDestructivePhrase(7);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Paper":
            theGame.setDestructivePhrase(1);
            theGame.roundWinner = 'No one.';
            break;
          case "Scissors":
            theGame.setDestructivePhrase(6);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Lizard":
            theGame.setDestructivePhrase(12);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Spock":
            theGame.setDestructivePhrase(13);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          default:
            theGame.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Scissors":
        switch(theGame.player2.chosenGesture){
          case "Rock":
            theGame.setDestructivePhrase(5);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Paper":
            theGame.setDestructivePhrase(6);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Scissors":
            theGame.setDestructivePhrase(2);
            theGame.roundWinner = 'No one.';
            break;
          case "Lizard":
            theGame.setDestructivePhrase(11);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Spock":
            theGame.setDestructivePhrase(10);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          default:
            theGame.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Lizard":
        switch(theGame.player2.chosenGesture){
          case "Rock":
            theGame.setDestructivePhrase(8);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Paper":
            theGame.setDestructivePhrase(12);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Scissors":
            theGame.setDestructivePhrase(11);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Lizard":
            theGame.setDestructivePhrase(3);
            theGame.roundWinner = 'No one.';
            break;
          case "Spock":
            theGame.setDestructivePhrase(9);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          default:
            theGame.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      case "Spock":
        switch(theGame.player2.chosenGesture){
          case "Rock":
            theGame.setDestructivePhrase(14);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Paper":
            theGame.setDestructivePhrase(13);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Scissors":
            theGame.setDestructivePhrase(10);
            theGame.player1.points++;
            theGame.roundWinner = `${theGame.player1.name}`;
            break;
          case "Lizard":
            theGame.setDestructivePhrase(9);
            theGame.player2.points++;
            theGame.roundWinner = `${theGame.player2.name}`;
            break;
          case "Spock":
            theGame.setDestructivePhrase(4);
            theGame.roundWinner = 'No one.';
            break;
          default:
            theGame.roundWinner = 'ERROR!!!';
            break;
        }
        break;
      default:
        theGame.roundWinner = 'ERROR!!!';
        break;
    }
  }

  setDestructivePhrase(index){
    theGame.destructivePhrase = theGame.destructivePhrases[index];
  }

  announceRoundWinner(){
    let gamePointText = "";
    if(theGame.player1.points === theGame.pointsToWin || theGame.player2.points === theGame.pointsToWin){
      gamePointText = "\nIt is decided.";
    }
    else if (theGame.player1.points === theGame.pointsToWin - 1 && theGame.player2.points === theGame.pointsToWin - 1){
      gamePointText = "\nLast point! It could go either way!";
    }
    else if (theGame.player1.points === theGame.pointsToWin - 1){
      gamePointText = `\nThis could be the last one! Can ${theGame.player2.name} catch up?`;
    }
    else if (theGame.player2.points === theGame.pointsToWin - 1){
      gamePointText = `\nThis could be the last one! Can ${theGame.player1.name} catch up?`;
    }
    theGame.determineSs();
    alert(`${theGame.player1.name} chose ${theGame.player1.chosenGesture}. ${theGame.player2.name} chose ${theGame.player2.chosenGesture}.
${theGame.destructivePhrase}
This round's winner is: ${theGame.roundWinner}

Points needed to win: ${theGame.pointsToWin}

${theGame.player1.name} has ${theGame.player1.points} point${theGame.player1.s}.
${theGame.player2.name} has ${theGame.player2.points} point${theGame.player2.s}.${gamePointText}`);
  }

  determineSs(){
    if(theGame.player1.points < 3 || theGame.player2.points < 3){
      if (theGame.player1.points === 1){
        theGame.player1.s = '';
      }
      else {
        theGame.player1.s = 's';
      }
      if (theGame.player2.points === 1){
        theGame.player2.s = '';
      }
      else {
        theGame.player2.s = 's';
      }
    }
  }

  determineGameWinner(){
    if(theGame.player1.points === theGame.pointsToWin){
    theGame.gameWinner = theGame.player1.name;
    }
    else if(theGame.player2.points === theGame.pointsToWin){
    theGame.gameWinner = theGame.player2.name;
    }
  }

  announceGameWinner(){
    alert(`This game's winner is... ${theGame.gameWinner}!`)
  }
}

let theGame = new Game();