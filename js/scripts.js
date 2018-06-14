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
    winnerMessage(player)
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

function winnerMessage(player) {
  $(".winner-name").text(player.name)
  $(".winner-points").text(player.points)
  $("#winner-message").show()
}

// User Interface

function updateScoreDisplay(playerOnePoints, playerTwoPoints, turnTotal) {
  $("#total").text(turnTotal);
  $("#turn-table").show();
  $("span#player-one-score").text(playerOnePoints)
  $("span#player-two-score").text(playerTwoPoints)
}

function updateRollDisplay(roll) {
  $("#last-roll").text(roll);
}

function animateRandomNumber(playerNumber) {
  var dice = $("#dice" + playerNumber);
  // dice.click(function(){
    $(".wrap" + playerNumber).append("<div id='dice_mask'></div>");//add mask
    dice.attr("class","dice");//After clearing the last points animation
    dice.css('cursor','default');
    var num = Math.floor(Math.random()*6+1);//random num 1-6
    dice.animate({left: '+2px'}, 50,function(){
      dice.addClass("dice_t");
    }).delay(100).animate({top:'-2px'},50,function(){
      dice.removeClass("dice_t").addClass("dice_s");
    }).delay(100).animate({opacity: 'show'},300,function(){
      dice.removeClass("dice_s").addClass("dice_e");
    }).delay(50).animate({left:'-2px',top:'2px'},50,function(){
      dice.removeClass("dice_e").addClass("dice_"+num);
    });
    $("#result" + playerNumber).html("Your last roll was a <span>"+num+"</span>");
    dice.css('cursor','pointer');
    $("#dice_mask").remove(); //remove mask

    return num
  }

$(document).ready(function() {
  var turnTotal = 0;

  $("button#name-submit").click(function(event) {
    event.preventDefault();
    var playerOneInput = $("input#nameFieldOne").val();
    var playerOne = new Player(playerOneInput);
    var playerTwoInput = $("input#nameFieldTwo").val();
    var playerTwo = new Player(playerTwoInput);
    $("span.player1-name").text(playerOne.name);
    $("span.player2-name").text(playerTwo.name);

    $("#names-div").hide();

    switchPlayers(playerTwo.points, playerTwo, playerOneInput);

    $(".scores-display").show();
    $("span.player-one-name").text(playerOne.name)
    $("span.player-two-name").text(playerTwo.name)
    updateScoreDisplay(playerOne.points, playerTwo.points, turnTotal)

    $("#dice1").click(function() {
      var roll = animateRandomNumber("1");
      updateRollDisplay(roll);
      var isOne = takesRollChecksForOne(roll);
      turnTotal = updateTurnTotal(roll, isOne, turnTotal, playerOne.points, playerOne, playerOne.name)
      updateScoreDisplay(playerOne.points, playerTwo.points, turnTotal)
    })

    $("#dice2").click(function() {
      var roll = animateRandomNumber("2");
      updateRollDisplay(roll);
      var isOne = takesRollChecksForOne(roll);
      turnTotal = updateTurnTotal(roll, isOne, turnTotal, playerTwo.points, playerTwo, playerOne.name);
      updateScoreDisplay(playerOne.points, playerTwo.points, turnTotal)
    })

    $("button#player-one-hold").click(function(){
      playerOne.points += turnTotal
      switchPlayers(playerOne.points, playerOne, playerOne.name)
      turnTotal = 0
      updateScoreDisplay(playerOne.points, playerTwo.points, turnTotal)
    })

    $("button#player-two-hold").click(function(){
      playerTwo.points += turnTotal
      switchPlayers(playerTwo.points, playerTwo, playerOne.name)
      turnTotal = 0
      updateScoreDisplay(playerOne.points, playerTwo.points, turnTotal)
    })
  })
})
