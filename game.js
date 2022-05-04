// Variables declaration
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var randomChosenColour;
var level = 0;

// Press any Key to Start; Add 1st colour
$("body").on("keypress", function() {
  if (gamePattern.length === 0) {
    nextSequence();
  }
});

// Adding random new colour to the sequence
function nextSequence() {
  $("#level-title").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  triggerButton(randomChosenColour);
}

// Collect each user's click & sending it for check
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  triggerButton(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//check asnwer if true(do nothing) or false(Game over and reset)
function checkAnswer(lastColor) {
  if (gamePattern[lastColor] != userClickedPattern[lastColor]) {
    //Game-over Styling
    wrongSound();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press Any Key To Restart");
    // Reset
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    return;
  } else if (gamePattern.length === userClickedPattern.length) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }

}
// Flash and sounds Functions
function triggerButton(theId) {
  $("#" + theId).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + theId + ".mp3");
  audio.play();
}

function wrongSound() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
}

// animation functions
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(removeAnimate, 100);

  function removeAnimate() {
    $("#" + currentColour).removeClass("pressed");
  }
}
