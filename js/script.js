var ctx = document.getElementById('ctx').getContext('2d');
const WIDTH = 440;
const HEIGHT = 680;
var shoot = new Audio();
shoot.src = "audio/shooting.wav"
var explosionSound = new Audio();
explosionSound.src = "audio/explosion.wav"
var bossDie = new Audio();
bossDie.src = "audio/bossDie.wav"
var bonusAudio = new Audio();
bonusAudio.src = "audio/bonus.wav"
var powerUpAudio = new Audio();
powerUpAudio.src = "audio/powerUp.wav"
var bossBulletAudio = new Audio();
bossBulletAudio.src = "audio/bossBullet.wav"
var startGameAudio = new Audio();
startGameAudio.src = "audio/startGame.wav"
var endGameAudio = new Audio();
endGameAudio.src = "audio/gameOver.wav"
var backgroundMusic = new Audio();
backgroundMusic.src = "audio/backgroundMusic.mp3";
var levelUp = new Audio();
levelUp.src = "audio/levelup.wav"


var Img = {};
Img.player = new Image();
Img.player.src = "img/player.png";
Img.enemy1 = new Image();
Img.enemy1.src = "img/enemy1.png";
Img.enemy2 = new Image();
Img.enemy2.src = "img/enemy2.png";
Img.enemy3 = new Image();
Img.enemy3.src = "img/enemy3.png";
Img.boss = new Image();
Img.boss.src = "img/boss.png";
Img.bullet = new Image();
Img.bullet.src = "img/bullet.png";
Img.bg = new Image();
Img.bg.src = "img/background.png";
Img.bossBullet = new Image();
Img.bossBullet.src = "img/bossBullet.png"
Img.bonus = new Image();
Img.bonus.src = "img/bonus.png"
Img.powerUp = new Image();
Img.powerUp.src = "img/powerUp.png"
Img.explosion = new Image();
Img.explosion.src = "img/explosion.png"

var finalScore = document.getElementById("finalscore")
var scoreText = document.getElementById("score");
var levelText = document.getElementById("level")
var levelTextNew = document.getElementById("displaylevel")
var reset = document.getElementById("restartbutton");
var gameOverText = document.getElementById("gameovertext");
var timeWhenStart = Date.now();
var gamePlay = true;
var bulletList ={};
var enemyBulletList = {};
var enemyList ={};
var bonusList ={};
var bossList ={};
var explosionList = {};
var score = 0;
var level = 1;
var frame = 0;
var isBoss = false;
var timeUpgrading = 900;
var single = true;
var triple = false;
var highScore = 0;

var player ={
    x: 250,
    y: 450,
    width: 80,
    height: 80,
    color: "green",
    atkSpd: 10,
    img: Img.player
}

function createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,img,id){
    var enemy = {
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        hp : hp,
        img : img,
        id: id
    }
    enemyList[id] = enemy;
}

function createBoss(xSpeed,ySpeed,x,y,width,height,color,hp,atkSpd,img,id){
    var boss = {
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        hp : hp,
        atkSpd : atkSpd,
        img: img,
        id: id
    }
    bossList[id] = boss;
}
function boss1(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 2;
    var x = WIDTH/2;
    var y = 0;
    var width = 150;
    var height = 150;
    var color = "pink";
    var hp = 50*level;
    var atkSpd = -2 - level;
    var img = Img.boss;
    var id = Math.random()
    createBoss(xSpeed,ySpeed,x,y,width,height,color,hp,atkSpd,img,id);
}

function randomEnemy1(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 2 + level
    var x = Math.random()*WIDTH;
    var y = 0;
    var width =80;
    var height = 80;
    var color = "red";
    var hp = 2*level;
    var img = Img.enemy1;
    var id = Math.random()
    createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,img,id);
}
function randomEnemy2(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 1+ Math.random()*3;
    var x = Math.random()*WIDTH;
    var y = 0;
    var width = 80;
    var height = 80;
    var color = "blue";
    var hp = 5*level;
    var img = Img.enemy2;
    var id = Math.random()
    createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,img,id);
}
function randomEnemy3(){
    var xSpeed = 1;
    var ySpeed = 1;
    var x = Math.random()*WIDTH;
    var y = 0;
    var width = 100;
    var height = 100;
    var color = "orange";
    var hp = 7*level;
    var img = Img.enemy3;
    var id = 3
    createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,img,id);
}
function createBullet(ySpeed,xSpeed,x,y,height,width,color,id){
    var bullet = {
        ySpeed : ySpeed,
        xSpeed : xSpeed,
        x: x,
        y: y,
        height : height,
        width: width,
        color: color,
        img: Img.bullet,
        id: id
    }
    bulletList[id] = bullet;
}
function createEnemyBullet(ySpeed,x,y,height,width,color,id){
    var bullet = {
        ySpeed : ySpeed,
        x: x,
        y: y,
        height : height,
        width: width,
        color: color,
        img: Img.bossBullet,
        id: id
    }
    enemyBulletList[id] = bullet;
}
function generateBullet(shooter,side,angle){
    var ySpeed = shooter.atkSpd;
    var xSpeed = angle;
    var x = shooter.x+side;
    var y = shooter.y;
    var height = 25;
    var width = 15;
    var color = "white";
    var id = Math.random();
    createBullet(ySpeed,xSpeed,x,y,height,width,color,id);
}
function generateEnemyBullet(shooter){
    var ySpeed = shooter.atkSpd;
    var x = shooter.x;
    var y = shooter.y+shooter.height/2;
    var height = 30;
    var width = 10;
    var color = "white";
    var id = Math.random();
    createEnemyBullet(ySpeed,x,y,height,width,color,id);
}
function createExplosion(x,y,height,width,id){
    var explo ={
        x: x,
        y: y,
        height: height,
        width: width,
        img: Img.explosion,
        id: id
    }
    explosionList[id] = explo;
}
function generateExplosion(locator){
    var x = locator.x;
    var y = locator.y;
    var height = locator.height;
    var width = locator.width;
    var id = Math.random();
    createExplosion(x,y,height,width,id)
}
function createBonus(x,y,ySpeed,width,height,img,category,id){
    var bonus ={
        x:x,
        y:y,
        ySpeed:ySpeed,
        width: width,
        height: height,
        img: img,
        category: category,
        id: id
    }
    bonusList[id] = bonus;
}
function generateBonus(mob){
    var x = mob.x;
    var y = mob.y;
    var ySpeed = 7+level;
    var id = Math.random();
    var category = 'score';
    var img = Img.bonus;
    var width = 25;
    var height = 25;
    createBonus(x,y,ySpeed,width,height,img,category,id);
}
function generateAtkSpd(mob){
    var x = mob.x;
    var y = mob.y;
    var ySpeed = 7+level;
    var id = Math.random();
    var category = 'atkSpd';
    var img = Img.powerUp;
    var width = 20;
    var height = 40;
    
    createBonus(x,y,ySpeed,width,height,img,category,id);
}
function drawImageActor(actor){
    ctx.save();
    var x = actor.x-actor.width/2;
    var y = actor.y-actor.height/2
    // ctx.drawImage(actor.img,x,y)
    ctx.drawImage(actor.img,0,0,actor.img.width,actor.img.height,x,y,actor.width,actor.height)
    ctx.restore();
}
function drawActor(actor){
    ctx.save();
    ctx.fillStyle = actor.color;
    ctx.fillRect(actor.x-actor.width/2,actor.y-actor.height/2,actor.width,actor.height);
    ctx.restore();
}
function updateBonusPosition(bonus){
    bonus.y += bonus.ySpeed;
}
function updateBonus(bonus){
    drawImageActor(bonus);
    updateBonusPosition(bonus);
}
 function updateRandomEnemyPosition(enemy){
        enemy.x += enemy.xSpeed;
        enemy.y += enemy.ySpeed;
        if(enemy.x < 0 || enemy.x > WIDTH){
            enemy.xSpeed = -enemy.xSpeed;
    }
        // if(enemy.y < 0 || enemy.y > HEIGHT){
        //     enemy.ySpeed = -enemy.ySpeed;
        // }
 }
 function updateBossPosition(enemy){
    enemy.x += enemy.xSpeed;
    enemy.y += enemy.ySpeed;
    if(enemy.x < 0 || enemy.x > WIDTH){
        enemy.xSpeed = -enemy.xSpeed;
}
    if(enemy.y < 0 || enemy.y > 3*HEIGHT/4){
        enemy.ySpeed = -enemy.ySpeed;
    }
}
 
 function updateBulletPosition(bullet){
     bullet.y -= bullet.ySpeed;
     bullet.x += bullet.xSpeed/2;
 }
 function updateBossBulletPosition(bullet){
    bullet.y -= bullet.ySpeed;
}
 function updateBullet(bullet){
     drawImageActor(bullet);
     updateBulletPosition(bullet);
 }
function updateBossBullet(bullet){
    drawImageActor(bullet);
    updateBossBulletPosition(bullet);
}
 
function updateRandomEnemy(enemy){
     drawImageActor(enemy);
     updateRandomEnemyPosition(enemy);
 }
function updateBoss(enemy){
    drawImageActor(enemy);
    updateBossPosition(enemy);
}


document.onmousemove = function(mouse){
    var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
    var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
   
    if(mouseX < player.width/2)
            mouseX = player.width/2;
    if(mouseX > WIDTH-player.width/2)
            mouseX = WIDTH - player.width/2;
    if(mouseY < player.height/2)
            mouseY = player.height/2;
    if(mouseY > HEIGHT - player.height/2)
            mouseY = HEIGHT - player.height/2;
   
    player.x = mouseX;
    player.y = mouseY;
}


testCollisionRectRect = function(rect1,rect2){
    return rect1.x <= rect2.x+rect2.width
            && rect2.x <= rect1.x+rect1.width
            && rect1.y <= rect2.y + rect2.height
            && rect2.y <= rect1.y + rect1.height;
}
testCollisionEntity = function (entity1,entity2){       //return if colliding (true/false)
    var rect1 = {
            x:entity1.x-entity1.width/2,
            y:entity1.y-entity1.height/2,
            width:entity1.width,
            height:entity1.height,
    }
    var rect2 = {
            x:entity2.x-entity2.width/2,
            y:entity2.y-entity2.height/2,
            width:entity2.width,
            height:entity2.height,
    }
    return testCollisionRectRect(rect1,rect2);
   
}


update = function(){
    if(gamePlay === true){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    frame++ 
    scoreText.textContent = "High Score : " + highScore;
    levelText.textContent =  score;
    levelTextNew.textContent = "Level : " + level;
    canvasBackground();
    var timePlaying = Date.now()-timeWhenStart;
    if( frame % 1800 === 0 && frame != 0){
        isBoss = true;
        boss1();
    }
    for (var i in bossList){
        updateBoss(bossList[i]);
        var isCollision = testCollisionEntity(player,bossList[i]);
        if(isCollision){
            frame = 0
            gameOver();
        }
        if(frame % (100-level) === 0){
            generateEnemyBullet(bossList[i]);
            bossBulletAudio.play();
        }    
    }
    for(var k in enemyBulletList){
        updateBossBullet(enemyBulletList[k]);
        
        var isCollision = testCollisionEntity(player,enemyBulletList[k]);
        if(isCollision){
            delete enemyBulletList[k];
            gameOver();
        }
    }
    
    if( frame % (900-level*3) === 0 && isBoss === false && frame != 0){
        randomEnemy2();
    }
    if( frame % 600 === 0 && isBoss === false && frame != 0){
        randomEnemy3();
        
    }
    if(frame % (200-level*3) === 0 && isBoss === false && frame != 0){
        randomEnemy1();
        
    }
    if(frame % (250-level*4) === 0 && isBoss === false && frame != 0){
        randomEnemy1();
        randomEnemy1();
    }
    if(frame % (180-level*4) === 0 && isBoss === false && frame != 0){
        randomEnemy1();
    
    }
   
    if(frame % Math.round(100/player.atkSpd) === 0 && single === true){
        generateBullet(player,0,0); 
        shoot.play();  
    }
    if(player.atkSpd > 13 && frame % Math.round(200/player.atkSpd) === 0 && triple === false){
        single = false;
        generateBullet(player,20,0);  
        generateBullet(player,-20,0);
        shoot.play();
    }
    if(player.atkSpd >= 17 && player.atkSpd < 22 && frame % Math.round(200/player.atkSpd) === 0){ 
        triple = true; 
        generateBullet(player,0,0);
        generateBullet(player,10,2);
        generateBullet(player,-10,-2);
        shoot.play();
    }
    if(player.atkSpd >= 22  && frame % Math.round(200/player.atkSpd) === 0){ 
        triple = true; 
        generateBullet(player,0,0);
        generateBullet(player,10,2);
        generateBullet(player,-10,-2);
        generateBullet(player,10,6);
        generateBullet(player,-10,-6);
        shoot.play();
    }

    for(var key in enemyList){
        updateRandomEnemy(enemyList[key]);
        var isCollision = testCollisionEntity(player,enemyList[key]);
        if(isCollision){
            delete enemyList[key];
            gameOver();
        }
    }
    for(var key in explosionList){
        
        drawImageActor(explosionList[key])
        if(frame % 7 === 0){

            delete explosionList[key];
        }
    }
    for(var key in bulletList){
        updateBullet(bulletList[key]); 
        for(var i in enemyList){
            var hit = testCollisionEntity(bulletList[key],enemyList[i]);
            if(hit){
                enemyList[i].hp -= 1
                
                delete bulletList[key];
                if(enemyList[i].hp === 0 || enemyList[i].y > HEIGHT){
                    generateExplosion(enemyList[i])
                    if(enemyList[i].id === 3){
                        generateAtkSpd(enemyList[i])
                    }
                    else{
                        generateBonus(enemyList[i]);
                    }
                    explosionSound.play();
                    delete enemyList[i];
                }
                break;
            }
        }   
    }
    for(var key3 in bonusList){
        updateBonus(bonusList[key3]);
        var isCollision = testCollisionEntity(player,bonusList[key3]);
        if(isCollision){
            if(bonusList[key3].category === 'score')
                score +=100;
                bonusAudio.play();
            if(bonusList[key3].category === 'atkSpd'){
                player.atkSpd += 2;
                score += 500;
                powerUpAudio.play();
                if(player.atkSpd >28){
                    player.atkSpd = 28;
                }
            }
            delete bonusList[key3];
        }
    }
    for(var key in bulletList){
        for(var key2 in bossList){
            var hitBoss = testCollisionEntity(bulletList[key],bossList[key2]);
            if(hitBoss){
                bossList[key2].hp -= 2;
                delete bulletList[key];
                if(bossList[key2].hp <= 0){
                    generateExplosion(bossList[key2])
                    bossDie.play();
                    levelUp.play();
                    delete bossList[key2];
                    frame = 0;
                    isBoss = false;
                    score += 2000;
                    level += 1;
                }
                break;
            }
        }
    }
    drawImageActor(player);
    requestAnimationFrame(update);
}}
var backgroundFrame = 0;
var bgY = -680;
function canvasBackgroundWaiting(){
    // ctx.save();
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.drawImage(Img.bg,0,bgY);
    backgroundFrame++;
    if(backgroundFrame % 1 === 0){
        bgY += 10; 
    }
    if(bgY >= 0){
        bgY = -680;
    }

    requestAnimationFrame(canvasBackgroundWaiting);
}
function canvasBackground(){
    ctx.drawImage(Img.bg,0,bgY);
    if(frame % 1 === 0){
        bgY += 5;
    }
    if(bgY >= 0){
        bgY = -680;
    }

}
function gameStart(){
    if(gamePlay === true){
        startGameAudio.play();
        backgroundMusic.play();
        backgroundMusic.loop = true;
        update();
    }
    if(gamePlay === false){
        gamePlay = true;
        startGameAudio.play()
        backgroundMusic.play();
        backgroundMusic.loop = true;
        update();
    }
    var but = document.getElementById("but");
    but.style.display = "none";
    reset.style.display = "none";
    gameOverText.style.display = "none";
    finalScore.textContent = "";
}
canvasBackgroundWaiting();
function gameOver(){
    if(score > highScore){
        highScore = score;
        finalScore.textContent = "New High Score: " + highScore;
    }
    else{
        finalScore.textContent = "High Score: " + highScore;
    }
    endGameAudio.play(); 
    gamePlay = false;
    bulletList ={};
    enemyBulletList = {};
    enemyList ={};
    bonusList ={};
    bossList ={};
    explosionList = {};
    score = 0;
    level = 1;
    frame = 0;
    player.atkSpd = 10;
    isBoss = false;
    single = true;
    gameOverText.style.display = "inline-block";
    reset.style.display = "inline-block";
}