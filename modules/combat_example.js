/*
*   Basic combat example. Player level is hardcoded at 7, most stats are based from level
*   The player attacks first, if the attack kills the enemy then the enemy doesn't attack back
*   if the attack does kill the enemy, it doesn't get an attack. Otherwise it will hit back.
*/


//returns a random number from one up to the specified number, so rollDie(20) would generate between 1 and 20
function rollDie(sides) {
    return Math.floor((Math.random() * Math.floor(sides))) + 1;
}

//returns the same number, hopefully will eventually look up how much damage a sword would do and such
function getDamage(weapon) {
    return rollDie(6);
}

function win() {
    console.log('You win!');
    //whatever from winning
}

function lose() {
    console.log('You lose!');
    //whatever from losing
}

//initialize stats and stuff
playerLevel = 7;
playerHP = playerLevel;
playerAC = 10 + playerLevel;
playerToHit = playerLevel;
playerWeapon = playerLevel;
enemyLevel = 5;
enemyHP = enemyLevel;
enemyAC = 10 + enemyLevel;
enemyToHit = enemyLevel;
enemyWeapon = enemyLevel;

function attack() {
    if (rollDie(20) + playerToHit > enemyAC) {
        //Hit Logic
        damage = getDamage(playerWeapon);
        enemyHP = enemyHP - damage;
        console.log('You do ' + damage + ' damage');
        if (enemyHP < 1) {
            //Enemy Death Logic
            console.log('The enemy is ded');
            win();
        } else {
            console.log('The enemy is still alive with ' + enemyHP + ' HP');
        }
    } else {
        //Miss Logic
        console.log('You missed');
    }

    if (enemyHP > 0) {
        if (rollDie(20) + enemyToHit > playerAC) {
            damage = getDamage(enemyWeapon);
            playerHP = playerHP - damage;
            console.log('The enemy does ' + damage + ' damage');
            if (playerHP < 1) {
                //Enemy Death Logic
                console.log('You are ded');
                lose();
            } else {
                console.log('You are still alive with ' + playerHP + ' HP');
            }
        } else {
            console.log('The enemy missed');
        }
    }
}

attack();
