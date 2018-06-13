// Business Logic

function Player (userName) {
  this.name = userName;
  this.points = 0;
}


Player.prototype.diceRoll = function() {
  return (Math.ceil(Math.random() * 6))
}

// Player.prototype.takesRollChecksForOne = function(roll, wasHoldClicked) {
//   var localTotal = 0
//   if (roll >= 2) {
//     localTotal += roll
//   } else {
//
//   }
//   return localTotal
// }

function takesRollChecksForOne(roll) {
  if (roll === 1) {
    return true
  } else {
    return false
  }
}

function updateTurnTotal(roll, wasOneRolled, turnTotal, playerPoints) {
  if (!wasOneRolled) {
    turnTotal += roll
  } else {
    turnTotal = 0
    switchPlayers(playerPoints)
  }
  return turnTotal
}

// User Interface

$(document).ready(function() {
  var turnTotal = 0;

  $("button#name-submit").click(function(event) {
    event.preventDefault();
    var playerOneInput = $("input#nameFieldOne").val();
    var playerOne = new Player(playerOneInput);
    var playerTwoInput = $("input#nameFieldTwo").val();
    var playerTwo = new Player(playerTwoInput);

    $("button#player-one-roll").click(function() {
      var roll = playerOne.diceRoll();
      var isOne = takesRollChecksForOne(roll);
      turnTotal = updateTurnTotal(roll, isOne, turnTotal, playerOne.points);
      console.log("Turn total for player 1: " + turnTotal);
    })

    $("button#player-two-roll").click(function() {
      var roll = playerTwo.diceRoll();
      var isOne = takesRollChecksForOne(roll);
      turnTotal = updateTurnTotal(roll, isOne, turnTotal, playerTwo.points);
      console.log("Turn total for player 2: " + turnTotal);
    })

    $("button#player-one-hold").click(function(){
      playerOne.points += turnTotal
      switchPlayers(playerOne.points)
      console.log("Player 1.points: " + playerOne.points);
      turnTotal = 0
    })

    $("button#player-two-hold").click(function(){
      playerTwo.points += turnTotal
      switchPlayers(playerTwo.points)
      console.log("Player 2.points: " + playerTwo.points);
      turnTotal = 0
    })
  })
})

function switchPlayers(points) {
  // business side
  checkWinCondition(points)

  // user interface side
    // hide user1 dice
    // show user2 dice
}

function checkWinCondition(points) {
 if (points >= 100) {
  return true
}
}
