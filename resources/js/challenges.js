'use strict';

// decide the variables
var playingState, currentScore, scores, activePlayer, dice1, dice2;

// Doing the initial setup
init();

// Challenge - 1
var lastDiceScore;

// Initialize
function init() {
    playingState = true;
    currentScore = 0;
    scores = [0, 0];
    activePlayer =  0;
    
    // At the time of the start
    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';
    
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;   
}

function nextPlayer() {
    // Change the player
    currentScore = 0;
    document.getElementById('current--' + activePlayer).textContent = currentScore;
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  
    
    // set scores to 0
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    // Change the active position of players
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    // hide the dice
    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';
}

// Event - Rolling
document.querySelector('.btn--roll').addEventListener('click', () => 
    {
        if(playingState){
            // Generate Random Number
            dice1 = Math.floor(Math.random() * 6) + 1;  
            dice2 = Math.floor(Math.random() * 6) + 1;  

            // Display the random number
            var diceOne = document.getElementById('dice--1');
            var diceTwo = document.getElementById('dice--2');
            diceOne.style.display = 'block';
            diceTwo.style.display = 'block';
            diceOne.src = 'resources/images/dice-' + dice1 + '.png';
            diceTwo.src = 'resources/images/dice-' + dice2 + '.png';

            // Add currentScore if dice does not give 1 - Player change
            if(dice1 === 1 || dice2 === 1) {
                // Player loses score
                scores[activePlayer] = 0;
                document.getElementById('score--' + activePlayer).textContent = '0';
                
                // Next Player
                nextPlayer();
                
            } else {
                currentScore = currentScore + dice1 + dice2;
                document.getElementById('current--' + activePlayer).textContent = currentScore;
            }
        }
});

// Event - Hold
document.querySelector('.btn--hold').addEventListener('click', () => 
    {
        if(playingState){
            // Add the currentScore to scores of each player
            scores[activePlayer] += currentScore;
            document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];

            // Check for winner - Hide the dice, show the winner
            var input = document.querySelector('.winning--score').value;
            
            if(scores[activePlayer] >= (input === true ? input : 20)) {
                document.getElementById('name--' + activePlayer).textContent = 'Winner!';
                
                document.getElementById('dice--1').style.display = 'none';
                document.getElementById('dice--2').style.display = 'none';
                document.querySelector('.player--' + activePlayer).classList.add('player--winner');
                document.querySelector('.player--' + activePlayer).classList.remove('player--active');
                
                playingState = false;
            } else {
                // Next Player
                nextPlayer();
            }
        }
});

// Event - New Game
document.querySelector('.btn--new').addEventListener('click', init);