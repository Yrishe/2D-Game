/*

The Game Project 6 - Adding game mechanics

Ps: I'd love to code a better character and a cooler background, but I haven't had
enough time to spend on it.  
*/


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


function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    // gameChar_x = width / 2;
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

    trees_x = [-200, -120, -100, -50, 50, 300, 400, 500, 600, 700, 800, 900, 1200, 1500, 1700, 1900]

    clouds_x = [100, 400, 800]

    mountains_x = [80, 200, 600, 1000, 1400, 1800, 2200, 2600, 3000, 3400]

    cameraPosX = 0;



}

function draw() {

    ///////////DRAWING CODE/////////

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
        drawCollectable(collectables[i]);
        checkCollectable(collectables[i]);

    }




    // the game character
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

    pop();

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
            }
        }
    }


}

function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released.

    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (keyCode == 37) {
        console.log("left arrow");
        isLeft = false;
    }
    else if (keyCode == 39) {
        console.log("right arrow");
        isRight = false;
    }
    else if (key == " ") {
        isFalling = false;
        gameChar_y = floorPos_y;
    }

}

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
        triangle(mountains_x[i] - 150, floorPos_y, mountains_x[i], 150, mountains_x[i] + 150, floorPos_y);
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
        ellipse(t_collectable.x_pos - 40, t_collectable.y_pos - 100, t_collectable.size, t_collectable.size);
    }

}

function drawCanyon(t_canyon) {

    noStroke();
    fill(150);
    rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);
}

function checkCollectable(t_collectable) {

    if (dist(gameChar_x, gameChar_y, t_collectable.x_pos - 40, t_collectable.y_pos - 100) < t_collectable.size) {
        t_collectable.isFound = true;
    }
}

function checkCanyon(t_canyon) {

    if ((gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width) && gameChar_y >= floorPos_y) {
        isPlummeting = true;
    }
}