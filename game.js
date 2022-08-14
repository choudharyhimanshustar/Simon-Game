var started = false;

//Create a new variable called level and start at level 0
var level = 0;

//At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

//At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//Inside game.js create a new function called nextSequence()
function nextSequence() {
  userClickedPattern = [];

  // increase the level by 1 every time nextSequence() is called
  level++;
  document.querySelector("#level-title").innerHTML = "Level " + level;
  //Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  //Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour);

  //use jQuery to animate a flash to the button selected
  $("#" + randomChosenColour)
    .fadeOut(120)
    .fadeIn(120)
    .fadeOut(120)
    .fadeIn(120);

  //playing sound in nextSequence()
  playSound(randomChosenColour);

  animatePress(randomChosenColour);
}

//detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function () {
  //create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = this.id;

  // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //playing sound when the user clicks a button.
  playSound(userChosenColour);

  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length - 1);
});

//new function called playSound() that takes a single input parameter called name
function playSound(name) {
  //use Javascript to play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  document.querySelector("." + currentColour).classList.add("pressed");

  // remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    document.querySelector("." + currentColour).classList.remove("pressed");
  }, 100);
}

//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
document.body.addEventListener("keydown", function () {
  if (!started) {
    nextSequence();

    started = true;
  }
});


//new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  //if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //If the user got the most recent answer right, then check that they have finished their sequence with another if statement
    if (userClickedPattern.length === gamePattern.length) {
      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  // play this sound if the user got one of the answers wrong.
  else {
    playSound("wrong");

    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and
    document.body.classList.add("game-over");

    //then remove it after 200 milliseconds
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);

    //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    document.querySelector("#level-title").innerHTML =
      "Game Over, Press Any Key to Restart";

    // Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}

//Create a new function called startOver()
function startOver() {
  //reset the values of level, gamePattern and started variables
  level = 0;
  gamePattern = [];
  started = false;
}
