"use strict";

let interactiveContent = document.getElementById("interactiveWindow");

function mainMenu(){
  interactiveContent.innerHTML = `<form id="form" name="">
  I want to play best of <label for="bestOf"><input id="bestOf" name="bestOf" type="number" class="numberInput" value="3" min="3" step="1" max="21"></label> against 
  <label for="againstWhom"><select id="againstWhom" name="againstWhom" class="dropdownInput">
    <option value="computer">the computer</option>
    <option value="human">the person next to me</option>
  </select></label>.<br>
  <div class="buttonHolder"><label for="start"><input id="start" type="submit" name="start" value="Start!"></label></div>
</form>`;
} 

function playGame(e) {
  let interactiveWindow = document.querySelector("#interactiveWindow"),
      form = interactiveWindow.querySelectorAll("#form"),
      submitInput = form[0].querySelector('input[type="submit"]');

  e.preventDefault();
  let formData = new FormData(form);
  alert(`Here's your form data:
bestOf: ${formData.get("bestOf")}
againstWhom: ${formData.get("againstWhom")}

Good job, Dillon!!`)
  
}







