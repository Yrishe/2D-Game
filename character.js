function drawGameCharacter() {
    if (isLeft && isFalling) {
        // add your jumping-left code
        image(jumpLeft_Image, gameChar_x, gameChar_y - 50, 50, 50);
    }
    else if (isRight && isFalling) {
        // add your jumping-right code
        image(jumpRight_Image, gameChar_x, gameChar_y - 50, 50, 50);
    }
    else if (isLeft) {
        // add your walking left code
        step += 1;
        if (step == 0) {
            image(walkLeft1_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 1) {
            image(walkLeft2_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 3) {
            image(walkLeft3_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 4) {
            image(walkLeft4_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 5) {
            image(walkLeft5_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 6) {
            image(walkLeft6_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 7) {
            image(walkLeft7_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 8) {
            image(walkLeft8_Image, gameChar_x, gameChar_y - 50, 50, 50);
            step = 0;
        }
    }
    else if (isRight) {
        // add your walking right code
        step += 1;
        if (step == 0) {
            image(walkRight1_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 1) {
            image(walkRight2_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 3) {
            image(walkRight3_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 4) {
            image(walkRight4_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 5) {
            image(walkRight5_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 6) {
            image(walkRight6_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 7) {
            image(walkRight7_Image, gameChar_x, gameChar_y - 50, 50, 50);
        }
        else if (step == 8) {
            image(walkRight8_Image, gameChar_x, gameChar_y - 50, 50, 50);
            step = 0;
        }
    }
    else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        image(standing_Image, gameChar_x, gameChar_y - 50, 50, 50);
    }
    else {
        // add your standing front facing code
        image(standing_Image, gameChar_x, gameChar_y - 50, 50, 50);
    }
}