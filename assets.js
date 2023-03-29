function preload() {
    soundFormats('mp3', 'wav');
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    fallinSound = loadSound('assets/falling.wav');
    fallinSound.setVolume(0.03);
    bonusSound = loadSound('assets/bonus.wav');
    bonusSound.setVolume(0.1);
    levelSound = loadSound('assets/level_complete.wav');
    levelSound.setVolume(0.1);
    walkSound = loadSound('assets/walk.wav');
    walkSound.setVolume(0.1);
    //load text font 
    gameOverFont = loadFont('fonts/Silkscreen/Silkscreen-Bold.ttf');
    //game chracter images preloaded
    walkLeft1_Image = loadImage('assets/walk-left1.PNG');
    walkLeft2_Image = loadImage('assets/walk-left2.PNG');
    walkLeft3_Image = loadImage('assets/walk-left3.PNG');
    walkLeft4_Image = loadImage('assets/walk-left4.PNG');
    walkLeft5_Image = loadImage('assets/walk-left5.PNG');
    walkLeft6_Image = loadImage('assets/walk-left6.PNG');
    walkLeft7_Image = loadImage('assets/walk-left7.PNG');
    walkLeft8_Image = loadImage('assets/walk-left8.PNG');
    walkRight1_Image = loadImage('assets/walk1.png');
    walkRight2_Image = loadImage('assets/walk2.png');
    walkRight3_Image = loadImage('assets/walk3.png');
    walkRight4_Image = loadImage('assets/walk4.png');
    walkRight5_Image = loadImage('assets/walk5.png');
    walkRight6_Image = loadImage('assets/walk6.png');
    walkRight7_Image = loadImage('assets/walk7.png');
    walkRight8_Image = loadImage('assets/walk8.png');
    standing_Image = loadImage('assets/stand.PNG');
    jumpRight_Image = loadImage('assets/jumpRight.PNG');
    jumpLeft_Image = loadImage('assets/jumpLeft.PNG');
    falling_Image = loadImage('assets/falling.PNG');
    finalFall_Image = loadImage('assets/finalFall.PNG');
    //enemy image preloaded
    enemy_Image = loadImage('assets/enemy.jpg');
    //prize image preloaded
    prize_Image = loadImage('assets/prize.PNG');
}