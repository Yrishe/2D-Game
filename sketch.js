/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var isFound;
var collectable;
var canyon;

//trees_x declared 
var trees_x;
//clouds declared
var clouds_x;
//montains declared
var mountains_x;
// cameraPosX declared 
var cameraPosX;

var d;

function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    collectable =
    {
        x_pos: 100,
        y_pos: floorPos_y,
        size: 35,
        isFound: false
    }

    canyon =
    {
        x_pos: 100,
        y_pos: floorPos_y,
        width: 100,
        height: floorPos_y
    }

    trees_x = [50, 300, 400, 500, 600, 700, 800]

    clouds_x = [100, 400, 800]

    mountains_x = [200, 400, 600, 800, 1000]

    cameraPosX = 0;

    d = 0;
}

function draw() {

    ///////////DRAWING CODE/////////
    for (i = 0; i < width; i++) {
        cameraPosX += ;
    }

    background(100, 155, 255); //fill the sky blue



    //draw some green ground
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y);


    push();
    //this line makes the background move constantly to the right

    d += 0.2;
    translate(-cameraPosX + d, 0);


    //next step
    //draw mountains
    for (var i = 0; i < mountains_x.length; i++) {
        fill(169, 100, 169);
        triangle(mountains_x[i - 1], floorPos_y, mountains_x[i], 150, mountains_x[i + 1], floorPos_y);
    }



    //trees loop
    for (var i = 0; i < trees_x.length; i++) {
        //draw trees 
        fill(139, 69, 19);
        rect(trees_x[i], floorPos_y - 100, 40, 100);
        rect(trees_x[i], floorPos_y - 100, 40, 100);
        //leaves
        fill(128, 128, 0);
        //first tree
        ellipse(trees_x[i] - 20, floorPos_y - 100, 100);
        ellipse(trees_x[i] + 65, floorPos_y - 140, 100);
        ellipse(trees_x[i] + 65, floorPos_y - 180, 100);
        ellipse(trees_x[i], floorPos_y - 180, 100);
    }

    //clouds loop
    for (var i = 0; i < clouds_x.length; i++) {
        fill(230);
        ellipse(clouds_x[i], floorPos_y - 360, 110, 80);
        ellipse(clouds_x[i] + 100, floorPos_y - 360, 110, 80);
        ellipse(clouds_x[i] + 50, floorPos_y - 360, 120, 90);
    }


    if (collectable.isFound == false) {
        fill(255, 255, 100);
        ellipse(collectable.x_pos - 40, collectable.y_pos - 100, collectable.size, collectable.size);
    }


    //draw the canyon
    fill(150);
    rect(canyon.x_pos, canyon.y_pos, canyon.width, canyon.height);
    //pop();


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
    if (isLeft == true) {
        //running left direction speed
        gameChar_x -= 5;
    }

    if (isRight == true) {
        //running right direction speed
        gameChar_x += 5;
    }

    if (gameChar_y < floorPos_y) {
        //falling speed
        gameChar_y += 4;
        isFalling = true;
    }
    else {
        isFalling = false;
    }


    if (isPlummeting) {
        isLeft = false;
        isRight = false;
        gameChar_y += 4;
    }

    //collectable item collision
    if (dist(gameChar_x, gameChar_y, collectable.x_pos - 40, collectable.y_pos - 100) < 20) {
        collectable.isFound = true;
    }


    //canyon collision
    if ((gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width) && gameChar_y >= floorPos_y) {
        isPlummeting = true;
        //        gameChar_y += 3;
        //        
        //        if(gameChar_y >= floorPos_y)
        //        {
        //            gameChar_y += 3;
        //        }
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
