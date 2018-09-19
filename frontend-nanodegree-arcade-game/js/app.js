const leftBound = 0;
const rightBound = 400;
const topBound = -18;
const bottomBound = 400;
const bugwidth = 100;
const initialPlayerX = 200;
const winBound = topBound + 100;

let allEnemies = [];
let levelNum = 0;
let levelWon = false;

const enemyDist = [
    [50],
    [50, 100],
    [50, 100, 150]
];

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = -90;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move(dt);
};

Enemy.prototype.move = function(dt) {
    const dx = 50;
    this.x = this.x+(dx*dt);
    if(this.x >= rightBound+bugwidth) {
        this.x = -bugwidth;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function createEnemies(level) {
    allEnemies = [];
    enemyDist[level].map( (y) => allEnemies.push(new Enemy(y)) );
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = initialPlayerX;
    this.y = bottomBound;
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function(dt) {
    for (enemy of allEnemies) {
        this.checkCollison(enemy);
    }
    this.checkWin();
};
Player.prototype.move = function(axis, dimension, movesize, lower, upper) {
    const newPosition = this[axis] + (dimension * movesize);
    if (newPosition < lower || newPosition > upper) {
        //Ideally put some effect in here to show wrong movement.
        //console.log("don't move offscreen");
    } else {
        this[axis] = newPosition;
    }
    console.log(`Player position is X: ${this.x} Y: ${this.y}`);
}
Player.prototype.handleInput = function(input){
    const dx = 100;
    const dy = 83;
    switch (input){
    case "left":
        this.move("x", -1, dx, leftBound, rightBound);
        break;
    case "right":
        this.move("x", 1, dx, leftBound, rightBound);
        break;
    case "up":
        this.move("y", -1, dy, topBound, bottomBound);
        break;
    case "down":
        this.move("y", 1, dy, topBound, bottomBound);
        break;
    }
    
};
Player.prototype.checkCollison = function(enemy) {
    const ydiff = 50;
    const xdiff = 80;
    if (Math.abs(this.x - enemy.x) < xdiff && Math.abs(this.y - enemy.y) < ydiff) {
        this.collision();
    }
}
Player.prototype.collision = function() {
    alert('You lose!'); 
    resetLevel();
}

Player.prototype.checkWin = function () {
    if (this.y <= 0 ) {
        levelWon = true;
        alert(`You win level ${levelNum++ +1}`);
        
        if (levelNum == 3) {
            alert(`You win the motherfucking game, biyaaatch!`)
        } else {
            resetLevel();
            levelWon = false;
        }
    }    
}

function resetLevel() {
    player = new Player();
    createEnemies(levelNum);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

createEnemies(levelNum);

let player = new Player();

alert(`Level ${levelNum +1}`);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
