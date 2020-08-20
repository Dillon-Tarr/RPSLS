"use strict";

let interactiveContent = document.getElementById("interactiveWindow");

function mainMenu(){
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
  let formData = document.getElementById("form");
  form.onsubmit = function(e) {
    e.preventDefault();
    let bestOf = formData.bestOf.value;
    let againstWhom = formData.againstWhom.value;
    playGame(bestOf, againstWhom);
  }
} 

function playGame(bestOf, againstWhom) {
  if (againstWhom == "computer"){
    playAgainstComputer(bestOf);
  }
  if (againstWhom == "human"){
    playAgainstHuman(bestOf);
  }
}

function playAgainstComputer(bestOf){
  let pointsToWin = bestOf / 2 + 0.5;
  console.log(`You will now play against the computer. First to ${pointsToWin} points wins!`)
}

function playAgainstHuman(bestOf){
  let pointsToWin = bestOf / 2 + 0.5;
  console.log(`You will now play against each other. First to ${pointsToWin} points wins!`)
}


