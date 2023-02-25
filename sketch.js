
var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var isFound;
var trees_x;
var clouds_x;
var mountains_x;
var cameraPosX;

var collectables;
var canyons;

var game_score;
var flagpole;
var lives;

var jumpSound;

function preload() {
    soundFormats('mp3', 'wav');

    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
}


function setup() {
    createCanvas(1024, 576);

    floorPos_y = height * 3 / 4;

    lives = [3];

    startGame();
}

function draw() {

    cameraPosX = gameChar_x - width / 2;

    background(100, 155, 255); //fill the sky blue


    //draw some green ground
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);



    //this line makes the background move constantly to the right
    push();
    translate(-cameraPosX, 0);



    //draw mountains
    drawMountains();

    //draw the canyon
    for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }



    //trees loop
    drawTrees();

    //clouds loop
    drawClouds();


    //collectable
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }

    }

    // renderFlagpole(flagpole);
    renderFlagpole(flagpole);

    if (flagpole.isReached == false) {
        checkFlagpole(flagpole);
    }

    // the game character
    drawGameCharacter();

    checkPlayerDie();

    pop();

    //game score 
    fill(255);
    noStroke();
    textSize(20);
    textAlign(LEFT, BOTTOM);
    text("Score: " + game_score, 20, 20);


    fill(255, 255);
    noStroke();
    textAlign(LEFT, TOP);
    text("Lives: " + lives, 25, 25);

    if (lives < 1) {
        fill(255, 255, 0);
        noStroke();
        textAlign(LEFT, BOTTOM);
        textSize(50);
        textStyle(BOLDITALIC);
        text("Game Over!", 400, 300);
        text("Press space to continue.", 250, 350);
    }

    if (flagpole.isReached == true) {
        fill(255, 255, 0);
        noStroke();
        textSize(35);
        textStyle(BOLDITALIC);
        text("Level complete. Press space to continue.", 200, 300);
    }

    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here


    //running speed and direction
    if (isLeft) {
        gameChar_x -= 6;
    } else if (isRight) {
        gameChar_x += 6;
    }

    // falling effect
    if (gameChar_y < floorPos_y) {
        gameChar_y += 5;
        isFalling = true;
    } else {
        isFalling = false;
    }


    if (isPlummeting) {
        isLeft = false;
        isRight = false;
        gameChar_y += 4;
    }
}

// KeyPressed and Released functions

function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed.

    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);


    if (!isPlummeting) {
        if (keyCode == 37 || key == "a") {
            console.log("left arrow");
            isLeft = true;
        }
        else if (keyCode == 39 || key == "d") {
            console.log("right arrow");
            isRight = true;
        }

        if (keyCode == 32 || key == " " || key == "w" || keyCode == 38) {

            if (isFalling == false) //avoid double jump
            {
                gameChar_y -= 100;
                jumpSound.play();
            }
        }
    }


}

function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released.

    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (keyCode == 37 || keyCode == 65) {
        console.log("left arrow");
        isLeft = false;
    }
    else if (keyCode == 39 || keyCode == 68) {
        console.log("right arrow");
        isRight = false;
    }
    else if (keyCode == 32) {
        isFalling = false;
        gameChar_y = floorPos_y;
    }

    if (flagpole.isReached == true && key == " ") {
        startGame();
    }

    if (gameChar_y > floorPos_y + 140 && key == " ") {
        startGame();
    }

}

// Drawing functions

function drawClouds() {

    for (var i = 0; i < clouds_x.length; i++) {
        fill(230);
        ellipse(clouds_x[i], floorPos_y - 360, 110, 80);
        ellipse(clouds_x[i] + 100, floorPos_y - 360, 110, 80);
        ellipse(clouds_x[i] + 50, floorPos_y - 360, 120, 90);
    }
}

function drawMountains() {

    for (var i = 0; i < mountains_x.length; i++) {
        fill(169, 100, 169);
        triangle(mountains_x[i] - 150, floorPos_y, mountains_x[i], 150,
            mountains_x[i] + 150, floorPos_y);
    }
}

function drawTrees() {

    for (var i = 0; i < trees_x.length; i++) {
        //draw trees 
        fill(139, 69, 19);
        rect(trees_x[i], floorPos_y - 100, 40, 100);
        rect(trees_x[i], floorPos_y - 100, 40, 100);
        //leaves
        fill(128, 128, 0);
        ellipse(trees_x[i] - 20, floorPos_y - 100, 100);
        ellipse(trees_x[i] + 65, floorPos_y - 140, 100);
        ellipse(trees_x[i] + 65, floorPos_y - 180, 100);
        ellipse(trees_x[i], floorPos_y - 180, 100);
    }
}

function drawCollectable(t_collectable) {

    if (t_collectable.isFound == false) {
        fill(255, 255, 100);
        ellipse(t_collectable.x_pos - 40, t_collectable.y_pos - 100, t_collectable.size,
            t_collectable.size);

    }

}

function drawCanyon(t_canyon) {

    noStroke();
    fill(150);
    rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);
}

function checkCollectable(t_collectable) {

    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos - 40, t_collectable.y_pos - 100) <
        t_collectable.size) {
        t_collectable.isFound = true;

        game_score += 1;
    }
}

function checkCanyon(t_canyon) {

    if ((gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width)
        && gameChar_y >= floorPos_y) {
        isPlummeting = true;
    }
}

function drawGameCharacter() {

    noStroke();
    if (isLeft && isFalling) {
        // add your jumping-left code

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 42, 15, 20);
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 32, 15, 30);
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 25, 5, 10);
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 2, 10, 5);
        rect(gameChar_x - 2, gameChar_y - 2, 10, 5);

    }
    else if (isRight && isFalling) {
        // add your jumping-right code

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 42, 15, 20);
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 32, 15, 30);
        fill(0);
        rect(gameChar_x - 5, gameChar_y - 25, 5, 10);
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 2, 10, 5);
        rect(gameChar_x + 5, gameChar_y - 2, 10, 5);

    }
    else if (isLeft) {
        // add your walking left code

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 42, 15, 20);
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 32, 15, 30);
        fill(0);
        rect(gameChar_x - 2, gameChar_y - 25, 5, 10);
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 2, 10, 5);
        rect(gameChar_x - 2, gameChar_y - 2, 10, 5);

    }
    else if (isRight) {
        // add your walking right code
        // character

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 42, 15, 20);
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 32, 15, 30);
        fill(0);
        rect(gameChar_x - 5, gameChar_y - 25, 5, 10);
        fill(0);
        rect(gameChar_x - 10, gameChar_y - 2, 10, 5);
        rect(gameChar_x + 5, gameChar_y - 2, 10, 5);

    }
    else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 42, 20, 20);
        fill(255, 0, 0);
        rect(gameChar_x - 8, gameChar_y - 32, 15, 30);
        fill(0);
        rect(gameChar_x + 10, gameChar_y - 25, 10, 5);
        rect(gameChar_x - 20, gameChar_y - 25, 10, 5);
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 2, 10, 5);
        rect(gameChar_x + 5, gameChar_y - 2, 10, 5);

    }
    else {
        // add your standing front facing code
        // character

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 42, 20, 20);
        fill(255, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 32, 20, 30);
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 2, 10, 5);
        rect(gameChar_x + 5, gameChar_y - 2, 10, 5);


    }
}

function renderFlagpole(t_flagpole) {

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
    if (dist(gameChar_x, gameChar_y, t_flagpole.x_pos, 395) < t_flagpole.size) {

        flagpole.isReached = true;
    }
}

function checkPlayerDie() {
    if (gameChar_y > floorPos_y + 140) {
        lives -= 1;

        if (lives !== 0) {
            startGame();
        } else {
            noLoop();
        }
    }



}

function startGame() {

    gameChar_x = 300;
    gameChar_y = floorPos_y;

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;


    collectables = [
        {
            x_pos: 500,
            y_pos: floorPos_y,
            size: 35,
            isFound: false
        },
        {
            x_pos: 1000,
            y_pos: floorPos_y,
            size: 35,
            isFound: false
        },
        {
            x_pos: 100,
            y_pos: floorPos_y,
            size: 35,
            isFound: false
        },
        {
            x_pos: -300,
            y_pos: floorPos_y,
            size: 35,
            isFound: false
        },
        {
            x_pos: 1200,
            y_pos: floorPos_y,
            size: 35,
            isFound: false
        }
    ]

    canyons = [
        {
            x_pos: random(-100, 100),
            y_pos: floorPos_y,
            width: random(50, 110),
            height: floorPos_y
        },
        {
            x_pos: random(400, 600),
            y_pos: floorPos_y,
            width: random(50, 110),
            height: floorPos_y
        },
        {
            x_pos: random(-400, -600),
            y_pos: floorPos_y,
            width: random(50, 110),
            height: floorPos_y
        },
        {
            x_pos: random(1000, 1200),
            y_pos: floorPos_y,
            width: random(50, 110),
            height: floorPos_y
        }

    ]

    trees_x = [-200, -120, -100, -50, 50, 300, 400, 500,
        600, 700, 800, 900, 1200, 1500, 1700, 1900]

    clouds_x = [100, 400, 800]

    mountains_x = [80, 200, 600, 1000, 1400, 1800, 2200, 2600, 3000, 3400]

    cameraPosX = 0;

    game_score = 0;

    flagpole = {
        x_pos: 2500,
        isReached: false,
        size: 50
    }
}



// function keyPressed()
// {
//     jumpSound.play();
// }
