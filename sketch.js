
function setup() {
    createCanvas(1024, 576);
    //floor position
    floorPos_y = height * 3 / 4;
    //initial lives array
    lives = [3];
    //calling startGame function
    startGame();
}

function draw() {
    //fill the sky
    background(random(0, 100), random(0, 100), random(0, 100));

    //draw ground
    noStroke();
    fill(248, 248, 255);
    rect(0, floorPos_y, width, height - floorPos_y);

    //this line takes print of the background giving an effect of movement as the game character moves to left or right
    push();
    translate(scrollPos, 0);
    //calling drawClouds function
    drawClouds();

    //looping through buildings array and calling draw object function
    for (var i = 0; i < buildings.length; i++) {
        buildings[i].draw();
    }
    //looping platforms array and calling draw object function
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
    //looping canyons array and calling drawCanyon and checkCanyon functions
    for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
    //looping through trees array and calling draw object function
    for (var i = 0; i < trees.length; i++) {
        trees[i].draw();
    }
    //looping through collectables array and using conditional statement to determine whent to call drawCollectable and checkCollectable functions
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }
    //conditional to check if flag is reached
    if (flagpole.isReached == false) {
        checkFlagpole(flagpole);
    }
    // calling drawFlagPole function
    drawFlagPole(flagpole);
    //looping through enemies array and calling draw function
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        //declaring a variable to check if game character has touched the enemies, calling the checkTouch object function
        var isContact = enemies[i].checkTouch(gameCharacter_world_x, gameChar_y);
        if (isContact) {
            if (lives > 0 && gameObj.game_score > 0) {
                startGame();
                lives -= 1;
                break;
            }
        }
    }
    pop();

    //the game character draw function
    drawGameCharacter();
    //calling checkPlayerDie 
    checkPlayerDie();

    //game score 
    fill(255);
    noStroke();
    textSize(20);
    textAlign(LEFT, BOTTOM);
    textFont(gameOverFont);
    text("Score: " + gameObj.game_score, 20, 20);
    //lives counter
    fill(255, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text("Lives: " + lives, 25, 25);
    //conditional statement to check flagpole state
    if (flagpole.isReached) {
        fill(255, 255, 0);
        noStroke();
        textSize(35);
        textFont(gameOverFont);
        text("Level completed!", 250, 300);
        text("Press space to continue.", 200, 350);
        return;
    }

    ///////////INTERACTION CODE//////////
    //making the chracter move to left
    if (isLeft) {
        if (gameChar_x > width * 0.2) {
            gameChar_x -= 5;
        }
        else {
            scrollPos += 5;
        }
    }
    //making the character move to right
    if (isRight) {
        if (gameChar_x < width * 0.8) {
            gameChar_x += 5;
        }
        else {
            scrollPos -= 5;
        }
    }
    //character falling effect
    if (gameChar_y < floorPos_y) {
        //falling over the platforms
        var isContact = false;
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].checkContact(gameCharacter_world_x, gameChar_y)) {
                isContact = true;
                isFalling = false;
                break;
            }
        }
        //falling over the buildings
        for (var i = 0; i < buildings.length; i++) {
            if (buildings[i].checkAprox(gameCharacter_world_x, gameChar_y)) {
                isContact = true;
                isFalling = false;
                break;
            }
        }
        //make sure if the character does not touch any surface
        if (isContact == false) {
            gameChar_y += 5;
            isFalling = true;
            walkSound.stop();
        }
    }
    else {
        isFalling = false;
    }
    //checking if the character is falling in the canyon
    if (isPlummeting) {
        isLeft = false;
        isRight = false;
        gameChar_y += 6;
        fallinSound.play();
    }
    //gameCharacter_world_x make sure the backgrounds moves depending on the character's position in the screen
    gameCharacter_world_x = gameChar_x - scrollPos;
}

function keyPressed() {
    // if statements to control the animation of the character when
    if (!isPlummeting) {
        //character moving to the left
        if (keyCode == 37 || key == "a") {
            console.log("left arrow");
            isLeft = true;
            walkSound.play();
        }
        //character moving to the right
        else if (keyCode == 39 || key == "d") {
            console.log("right arrow");
            isRight = true;
            walkSound.play();
        }
        //character jumping
        if (keyCode == 32 || key == " " || key == "w" || keyCode == 38) {
            //avoid double jump
            if (isFalling == false) {
                gameChar_y -= 100;
                jumpSound.play();
            }
        }
    }
    //if player dies restart the game and space key is pressed, restart the game
    if (gameChar_y > floorPos_y + 140 && key == " ") {
        startGame();
        lives = 3;
    }
    //if the flag is reached and space key is pressed, restart the game
    if (flagpole.isReached == true && key == " ") {
        startGame();
    }
}

function keyReleased() {
    // if statements to control the animation of the character when keys are released
    if (keyCode == 37 || keyCode == 65) {
        console.log("left arrow");
        isLeft = false;
        walkSound.stop();
    }
    else if (keyCode == 39 || keyCode == 68) {
        console.log("right arrow");
        isRight = false;
        walkSound.stop();
    }
    else if (keyCode == 32) {
        isFalling = false;
        gameChar_y = floorPos_y;
    }
}

function drawClouds() {
    var len = 100;
    var hig = 80;
    var m = 360;
    for (var i = 0; i < clouds_x.length; i++) {
        fill(230, 230, 230);
        ellipse(clouds_x[i], floorPos_y - m, len, hig);
        ellipse(clouds_x[i] + len, floorPos_y - m, len, hig);
        fill(230, 230, 230);
        ellipse(clouds_x[i] + len / 2, floorPos_y - m, len, hig + 10);
    }
}

function createBuildings(x, y, length, color, xr, xl) {
    //object 
    var b = {
        x: x,
        y: y,
        length: length,
        color: color,
        xr: xr,
        xl: xl,
        draw: function () {
            //draw building 
            fill(72, 61, 139);
            strokeWeight(3);
            rect(this.x, 200, this.length, this.y);
            //draw windows
            fill(this.color);
            strokeWeight(2);
            //right
            rect(this.xl, 220, 50, 50);
            rect(this.xl, 295, 50, 50);
            rect(this.xl, 370, 50, 50);
            //left
            rect(this.xr, 220, 50, 50);
            rect(this.xr, 295, 50, 50);
            rect(this.xr, 370, 50, 50);
        },
        checkAprox: function (cha_x, cha_y) {
            if (cha_x > this.x && cha_x < this.x + this.length) {
                var up = this.y - cha_y;
                if (up >= 0 && up <= 55) {
                    return true;
                }
            }
            return false;
        }
    }
    return b;
}

function drawTrees(x, y, length) {
    var t =
    {
        x: x,
        y: y,
        length: length,
        draw: function () {
            //draw trees 
            fill(139, 69, 19);
            rect(this.x, floorPos_y - 100, this.length, this.y);
            rect(this.x, floorPos_y - 100, this.length, this.y);
            //leaves
            fill(128, 128, 0);
            ellipse(this.x - 20 * random(-0.05, 0.05), floorPos_y - 100, 100);
            ellipse(this.x + 65, floorPos_y - 140, 100);
            ellipse(this.x + 65 * random(-0.05, 0.05), floorPos_y - 180, 100);
            ellipse(this.x, floorPos_y - 180, 100);
        }
    }
    return t;
}

function drawCollectable(t_collectable) {
    if (t_collectable.isFound == false) {
        // fill(255, 255, 100);
        // ellipse(t_collectable.x_pos - 40, t_collectable.y_pos - 100, t_collectable.size,
        //     t_collectable.size);
        image(prize_Image, t_collectable.x_pos - 40, t_collectable.y_pos - 100, t_collectable.size,
            t_collectable.size);
    }

}

function checkCollectable(t_collectable) {
    if (dist(gameCharacter_world_x, gameChar_y, t_collectable.x_pos - 40, t_collectable.y_pos - 100) <
        t_collectable.size) {
        t_collectable.isFound = true;
        bonusSound.play();
        gameObj.game_score += 1;
    }
}

function drawCanyon(t_canyon) {
    noStroke();
    fill(50);
    rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);
}

function checkCanyon(t_canyon) {
    if ((gameCharacter_world_x > t_canyon.x_pos && gameCharacter_world_x < t_canyon.x_pos + t_canyon.width)
        && gameChar_y >= floorPos_y) {
        isPlummeting = true;
    }
}

function drawFlagPole(t_flagpole) {
    push();
    strokeWeight(5);
    stroke(100);
    line(t_flagpole.x_pos, floorPos_y, t_flagpole.x_pos, floorPos_y - 200);
    fill(255, 0, 0);
    noStroke();
    if (flagpole.isReached) {
        triangle(t_flagpole.x_pos, floorPos_y - 200, t_flagpole.x_pos, floorPos_y - 160,
            t_flagpole.x_pos + 50, floorPos_y - 180);
    } else {
        triangle(t_flagpole.x_pos, floorPos_y, t_flagpole.x_pos, floorPos_y - 30,
            t_flagpole.x_pos + 50, floorPos_y - 15);
    }
    pop();
}

function checkFlagpole(t_flagpole) {
    if (dist(gameCharacter_world_x, gameChar_y, t_flagpole.x_pos, 395) < t_flagpole.size) {
        levelSound.play();
        flagpole.isReached = true;
    }
    else {
        flagpole.isReached = false;
    }
}

function checkPlayerDie() {
    var d = 140;
    if (gameChar_y > floorPos_y + d) {
        if (lives > 0) {
            lives -= 1;
            startGame();
        }
        else {
            fill(255, 0, 0);
            noStroke();
            textAlign(LEFT, BOTTOM);
            textSize(50);
            textFont(gameOverFont);
            text("Game Over!", 350, 300);
            text("Press space to restart", 40, 350);
            return;
        }
    }
}

function createPlatforms(x, y, length) {
    var p =
    {
        x: x,
        y: y,
        length: length,
        draw: function () {
            fill(255);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function (gc_x, gc_y) {
            var di = this.x + this.length;
            console.log("this is di " + di);
            if (gc_x > this.x && gc_x < di) {
                var on = this.y - gc_y;
                if (on >= 0 && on < 5) {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}

function Enemy(x, y, range) {
    this.x = x,
        this.y = y,
        this.range = range,
        this.currentX = x,
        this.inc = 1,
        //function to update the enemies direction
        this.update = function () {
            this.currentX += this.inc;
            if (this.currentX >= this.x + this.range) {
                this.inc = -1;
            }
            else if (this.currentX < this.x) {
                this.inc = 1;
            }
        },
        this.draw = function () {
            this.update();
            image(enemy_Image, this.currentX, this.y, 40, 40);
        },
        //function checkTouch to check the contact between game character and the enemies
        this.checkTouch = function (gc_x, gc_y) {
            var d = dist(gc_x, gc_y, this.currentX, this.y)
            if (d < 50) {
                return true;
            }
            return false;
        }
}