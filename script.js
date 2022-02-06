const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    x: 200,
    y: 200,
    width: 40,
    height: 72,
    frameX: 0, // cut outs for spritesheets X and Y
    frameY: 0,
    speed: 9,
    moving: false
};

const playerSprite = new Image();
playerSprite.src = "assets/chewie.png";
const background = new Image();
background.src = "assets/background.png";


/**
 * source X,Y,W,H will crop out image from top left corner
 * 
 * @param {Object} source img 
 * @param {number} source_x_position sX 
 * @param {number} source_y_position sY 
 * @param {number} source_Width sW 
 * @param {number} source_Height sH 
 * @param {number} destination_x_position dX 
 * @param {number} destination_y_position dY 
 * @param {number} destination_Width dW 
 * @param {number} destination_Height dH 
 */

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


// event listeners with callback function 
window.addEventListener("keydown", function(e){
    keys[e.key] = true;
    player.moving = true;
    
});

window.addEventListener("keyup", function(e){
    delete keys[e.key];
    player.moving = false;
});

// controling player, including the case sensitivity
function movePlayer(){
    if (keys["s"] && player.y < 450 || keys["S"] && player.y < 450 ){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    } else if (keys["w"] && player.y > 100 || keys["W"] && player.y > 100){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    } else if (keys["a"] && player.x > 20 || keys["A"] && player.x > 20){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    } else if (keys["d"] && player.x < 720 || keys["D"] && player.y < 720){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
    
    //omni-direction supposed to be: if s and d then do player.y and x plus.. the closest I have got was keys["s"],["d"]...
    /*} else if (keys["s","d"]){
        player.y += player.speed;
        player.x += player.speed;
        console.log("IM WORKING");
    }*/
}

function handlePlayerFrame(){
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}


// global variables
let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now(); // inbuilt function 
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(background, 0,0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width*player.frameX,player.height*player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
        requestAnimationFrame(animate);
    }
}
startAnimating(30);

//animate();
//this is how we can control speed of game
/*setInterval(function(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(background, 0,0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width*player.frameX,player.height*player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
        //requestAnimationFrame(animate);
}, 60);*/