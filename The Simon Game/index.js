var gamePattern = [];
var userClickPattern = [];

var buttonColors = ["red", "green", "yellow", "blue"];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickPattern = [];
  $("h1").text("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);

  $("#" + chosenColor)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200);
  playSound(chosenColor);

  console.log("game pattern is: " + gamePattern);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  console.log("user input pattern is: " + userClickPattern);
  checkAnswer(userClickPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(len) {
  if (gamePattern[len] === userClickPattern[len]) {
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over');
    },200);
    $('h1').text('Game Over! Press Any Key to Restart');
    startOver();
  }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}