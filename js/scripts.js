// Business Logic

function Player (userName) {
  this.name = userName;
  this.points = 0;
}


Player.prototype.diceRoll = function() {
  return (Math.ceil(Math.random() * 6))
}

function takesRollChecksForOne(roll) {
  if (roll === 1) {
    return true
  } else {
    return false
  }
}

function updateTurnTotal(roll, wasOneRolled, turnTotal, playerPoints, player, playerOneInput) {
  if (!wasOneRolled) {
    turnTotal += roll
  } else {
    turnTotal = 0
    switchPlayers(playerPoints, player, playerOneInput)
  }
  return turnTotal
}


function switchPlayers(points, player, playerOneInput) {
  // business side
  checkWinCondition(points)
  if (checkWinCondition(points)){
    console.log("you win");
  }

  // user interface side
  if (playerOneInput === player.name) {
    $("#player-one-buttons").hide();
    $("#player-two-buttons").show();
  } else {
    $("#player-two-buttons").hide();
    $("#player-one-buttons").show();
  }
}

function checkWinCondition(points) {
 if (points >= 100) {
  return true
}
}

// User Interface

function updateScoreDisplay(playerOnePoints, playerTwoPoints) {
  $("span#player-one-score").text(playerOnePoints)
  $("span#player-two-score").text(playerTwoPoints)
}

$(document).ready(function() {
  var turnTotal = 0;

  $("button#name-submit").click(function(event) {
    event.preventDefault();
    var playerOneInput = $("input#nameFieldOne").val();
    var playerOne = new Player(playerOneInput);
    var playerTwoInput = $("input#nameFieldTwo").val();
    var playerTwo = new Player(playerTwoInput);

    $("#name-fields").hide();
    switchPlayers(playerTwo.points, playerTwo, playerOneInput);

    $(".scores-display").show();
    $("span.player-one-name").text(playerOne.name)
    $("span.player-two-name").text(playerTwo.name)
    updateScoreDisplay(playerOne.points, playerTwo.points)

    $("button#player-one-roll").click(function() {
      var roll = playerOne.diceRoll();
      var isOne = takesRollChecksForOne(roll);
      turnTotal = updateTurnTotal(roll, isOne, turnTotal, playerOne.points, playerOneInput)
      updateScoreDisplay(playerOne.points, playerTwo.points)
      console.log("Turn total for player 1: " + turnTotal);
    })

    $("button#player-two-roll").click(function() {
      var roll = playerTwo.diceRoll();
      var isOne = takesRollChecksForOne(roll);
      turnTotal = updateTurnTotal(roll, isOne, turnTotal, playerTwo.points, playerOneInput);
      updateScoreDisplay(playerOne.points, playerTwo.points)
      console.log("Turn total for player 2: " + turnTotal);
    })

    $("button#player-one-hold").click(function(){
      playerOne.points += turnTotal
      switchPlayers(playerOne.points, playerOne, playerOneInput)
      updateScoreDisplay(playerOne.points, playerTwo.points)
      console.log("Player 1.points: " + playerOne.points);
      turnTotal = 0
    })

    $("button#player-two-hold").click(function(){
      playerTwo.points += turnTotal
      switchPlayers(playerTwo.points, playerTwo, playerOneInput)
      updateScoreDisplay(playerOne.points, playerTwo.points)
      console.log("Player 2.points: " + playerTwo.points);
      turnTotal = 0
    })
  })
})
