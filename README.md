# Pig Dice

#### Epicodus Intro to Programming: Pig Dice, June 13th 2018

#### By Ryan Putman, Rita Bennett-Chew

## Description
A web page to display the pig dice game


## Setup/Contribution Requirements

1. Clone the repo
1. Make a new branch
1. Commit and push your changes
1. Create a PR

## Technologies Used

* Bootstrap x.x.x
* jQuery 3.3.1

## Specs/ Pseudo Code
* Create player object
  * with points and name properties
* Roll a dice and give number between 1-6
* Make dice roll a method of player object
* add pushLocalTotal method to player object  
  * Within pushLocalTotal, if roll = 2-6, then add roll to localTotal
  * Else if onHoldCLick === true, push/add localTotal -> player.points
    * checkWinCondition
    * {hide player1 Dice, and show player2 dice, and show banner
  * else {
    checkWinCondition hide player1 Dice, and show player2 dice, and show banner to switch players}
* onHoldCLick : if pushed, return True

* if player.points  >= 100 , {trigger win}

## License

This software is licensed under the MIT license.

Copyright (c) 2018 **Ryan Putman and Rita Bennett-Chew**
