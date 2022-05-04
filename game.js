// Variables declaration
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var randomChosenColour;
var level = 0;
var mobile = false;

//Detect if the used is on Mobile or PC
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   $("#level-title").text("Tap on the Blue Background to Start");
   mobile = true;
};

// Press any Key to Start; Add 1st colour
$("body").on("keypress", function() {
  if (gamePattern.length === 0) {
    nextSequence();
  }
});

$("body").on("click", function() {
  if (gamePattern.length === 0) {
    if (mobile){
    nextSequence();
}  }
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
    if (mobile==true){
      $("#level-title").text("Game Over! Tap Anywhere To Restart");
    } else {
      $("#level-title").text("Game Over! Press Any Key To Restart");
    }

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
  audio.volume = 0.1;
  audio.play();
}

function wrongSound() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.volume = 0.1;
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
