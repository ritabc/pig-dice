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

function updateTurnTotal(roll, wasOneRolled, turnTotal) {
  if (!wasOneRolled) {
    turnTotal += roll
  } else {
    // hide user1 dice
    // show user2 dice
    turnTotal = 0
  }
  return turnTotal
}

// User Interface

$(document).ready(function() {

var playerOneName = $("#nameFieldOne").val();
var playerTwoName = $("#nameFieldTwo").val();
var playerOne = new Player("Dave");
var turnTotal = 0; //test for necessity after button is added


  $("button#roll").click(function() {
      debugger;
    var roll = playerOne.diceRoll();
    var isOne = takesRollChecksForOne(roll);
    turnTotal = updateTurnTotal(roll, isOne, turnTotal);

    console.log(turnTotal);
  })
})


// Comments
//
// onRollClick(){
//   var roll = player.diceRoll
//   var turnTotal = 0
//   takesRollChecksForOne(roll){
//       wasOneRolled = true if roll = 1
//       wasOneRolled = false if roll 2 - 6
//       return wasOneRolled
//   }
//
//   updateTurnTotal(roll, wasOneRolled)
//     if !wasOneRolled, {update turnTotal), continues turn}
//     else {switch players and reset turnTotal}
// }
//
// onHoldClick () {
//   player.points += turnTotal
// }
