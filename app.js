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
      return theGame.createPlayer1();
    }
  }
  
  createPlayer1(){
    if (theGame.againstWhom === 'computer'){
      var unnamedPlayersName = 'your';
    }
    else if (theGame.againstWhom === 'human'){
      var unnamedPlayersName = "Player 1's";
    }
    interactiveContent.innerHTML =
    `<form id="form" name="form">
    What is ${unnamedPlayersName} name? <label for="playerName"><input type="text" maxlength="36" placeholder="your name goes here" name="playerName"></label>
    <div class="buttonHolder"><label for="start"><input id="startButton" type="submit" name="start" value="That there is my name!"></label></div>
  </form>`;
    let form = document.getElementById("form");
    form.onsubmit = function(e) {
      e.preventDefault();
      if (form.playerName.value.length < 1){
        return theGame.createPlayer1();
      }
      theGame.player1 = new Human(form.playerName.value);
      return theGame.createPlayer2();
    }
  }

  createPlayer2(){
    if (theGame.againstWhom === 'computer'){
      theGame.player2 = new Computer("Computer");
      theGame.announceStartOfGame();
    }
    else if (theGame.againstWhom === 'human'){

      interactiveContent.innerHTML =
      `<form id="form" name="form">
      What is Player 2's name? <label for="playerName"><input type="text" maxlength="36" placeholder="your name goes here" name="playerName"></label>
      <div class="buttonHolder"><label for="start"><input id="startButton" type="submit" name="start" value="That there is my name!"></label></div>
    </form>`;
      let form = document.getElementById("form");
      form.onsubmit = function(e) {
        e.preventDefault();
        if (form.playerName.value.length < 1){
          return theGame.createPlayer2();
        }
        theGame.player2 = new Human(form.playerName.value);
        return theGame.announceStartOfGame();
      }
    }
  }

  announceStartOfGame(){
    interactiveContent.innerHTML =
    `<form id="form" name="form">
    ${theGame.player1.name} challenges ${theGame.player2.name} to a best-of-${theGame.bestOf} game of...<br>
    Rock, Paper, Scissors, Lizard, Spock!<br><br>
    First to ${theGame.pointsToWin} points wins!<br>
    <div class="buttonHolder"><label for="start"><input id="startButton" type="submit" name="start" value="Okay, okay... I want to play now!"></label></div>
    </form>`
    let form = document.getElementById("form");
    form.onsubmit = function(e) {
      e.preventDefault();
      return theGame.playGame();
    }
  }

  playGame(){
    do {
      theGame.player1.chooseGesture();
      theGame.player2.chooseGesture();
      theGame.determineRoundWinner();
      theGame.announceRoundWinner();
    } while (theGame.player1.points < theGame.pointsToWin && theGame.player2.points < theGame.pointsToWin); // theGame.pointsToWin is established in theGame.determineBestOf()
    theGame.determineGameWinner();
    theGame.announceGameWinner();
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
    alert(`This game's winner is... ${theGame.gameWinner}!`);
    return theGame.setMainMenu();
  }
}

let theGame = new Game();