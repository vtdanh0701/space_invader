var ctx = document.getElementById('ctx').getContext('2d');
const WIDTH = 440;
const HEIGHT = 680;
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
Img.bullet.src = "img/beams.png";
Img.bg = new Image();
Img.bg.src = "img/space.png";

var timeWhenStart = Date.now();
var bulletList ={};
var enemyBulletList = {};
var bossBullet ={}
var enemyList ={};
var bonusList ={};
var bossList ={};
var score = 0;
var level = 1;
var frame = 0;
var isBoss = false;
var timeUpgrading = 900;

var player ={
    x: 250,
    y: 450,
    width: 80,
    height: 80,
    color: "green",
    atkSpd: 3,
    img: Img.player
}
ctx.fillText("Hello",250,250);

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
    var hp = 100 + level*2;
    var atkSpd = -2 - level;
    var img = Img.boss;
    var id = Math.random()
    createBoss(xSpeed,ySpeed,x,y,width,height,color,hp,atkSpd,img,id);
}

function randomEnemy1(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 1+ Math.random()*3;
    var x = Math.random()*WIDTH;
    var y = 0;
    var width =80;
    var height = 80;
    var color = "red";
    var hp = 1 + level;
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
    var hp = 3+level;
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
    var hp = 20 + level;
    var img = Img.enemy3;
    var id = Math.random()
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
        id: id
    }
    enemyBulletList[id] = bullet;
}
function generateBullet(shooter,side,angle){
    var ySpeed = shooter.atkSpd;
    var xSpeed = angle;
    var x = shooter.x+side;
    var y = shooter.y;
    var height = 10;
    var width = 4;
    var color = "white";
    var id = Math.random();
    createBullet(ySpeed,xSpeed,x,y,height,width,color,id);
}
function generateEnemyBullet(shooter){
    var ySpeed = shooter.atkSpd;
    var x = shooter.x;
    var y = shooter.y;
    var height = 10;
    var width = 4;
    var color = "white";
    var id = Math.random();
    createEnemyBullet(ySpeed,x,y,height,width,color,id);
}

function createBonus(x,y,ySpeed,width,height,color,category,id){
    var bonus ={
        x:x,
        y:y,
        ySpeed:ySpeed,
        width: width,
        height: height,
        color: color,
        category: category,
        id: id
    }
    bonusList[id] = bonus;
}
function generateBonus(mob){
    var x = mob.x;
    var y = mob.y;
    var ySpeed = 3;
    var width = 10;
    var height = 10;
    var id = Math.random();
    if(Math.random()<0.8){
        var category = 'score';
        var color = 'orange';
    } 
    else {
            var category = 'atkSpd';
            var color = 'purple';
    }
    createBonus(x,y,ySpeed,width,height,color,category,id);
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
    drawActor(bonus);
    updateBonusPosition(bonus);
}
 function updateRandomEnemyPosition(enemy){
        enemy.x += enemy.xSpeed;
        enemy.y += enemy.ySpeed;
        if(enemy.x < 0 || enemy.x > WIDTH){
            enemy.xSpeed = -enemy.xSpeed;
    }
        if(enemy.y < 0 || enemy.y > HEIGHT){
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
     drawActor(bullet);
     updateBulletPosition(bullet);
 }
function updateBossBullet(bullet){
    drawActor(bullet);
    updateBossBulletPosition(bullet);
}
 
 function updateRandomEnemy(enemy){
     drawImageActor(enemy);
     updateRandomEnemyPosition(enemy);
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
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    ctx.drawImage(Img.bg,0,0);
    frame++ 
    var timePlaying = Date.now()-timeWhenStart;
    if( frame % 1800 === 0){
        isBoss = true;
        boss1();
    }
    for (var i in bossList){
        updateRandomEnemy(bossList[i]);
        var isCollision = testCollisionEntity(player,bossList[i]);
        if(isCollision){
            console.log("GAME OVER");
        }
        if(frame % (100-level) === 0){
            generateEnemyBullet(bossList[i]);
        } 
        for(var k in enemyBulletList){
            updateBossBullet(enemyBulletList[k]);
            var isCollision = testCollisionEntity(player,enemyBulletList[k]);
            if(isCollision){
                delete enemyBulletList[k];
                console.log("GAME OVER!!")
            }
        }
    }
    
    if(timePlaying > 15000 && frame % (200-level) === 0 && isBoss === false){
        randomEnemy2();
    }
    if(timePlaying > 30000 && frame % (500-level) === 0 && isBoss === false){
        randomEnemy3();
    }
    if(frame % (100-level) === 0 && isBoss === false){
        randomEnemy1();
    }
    if(player.atkSpd < 4 && frame % Math.round(50/player.atkSpd) === 0){
        generateBullet(player,0,0);   
    }
    if(player.atkSpd > 3 && frame % Math.round(50/player.atkSpd) === 0){
        generateBullet(player,0,0);   
    }
    if(player.atkSpd > 10 && frame % Math.round(50/player.atkSpd) === 0){
        generateBullet(player,10,1);  
    }
    if(player.atkSpd > 20 && frame % Math.round(50/player.atkSpd) === 0){ 
        generateBullet(player,-10,-1);
        timeUpgrading--;
        if(timeUpgrading <= 0){
            player.atkSpd = 10;
            timeUpgrading = 900;
        }
    }
    // if(frame % 500 === 0){
    //     generateBonus();
    // }
    for(var key in enemyList){
        updateRandomEnemy(enemyList[key]);
        var isCollision = testCollisionEntity(player,enemyList[key]);
        if(isCollision){
            delete enemyList[key];
            console.log("GAME OVER!!")
        }
    }
    for(var key in bulletList){
        updateBullet(bulletList[key]); 
        
        for(var i in enemyList){
            var hit = testCollisionEntity(bulletList[key],enemyList[i]);
            if(hit){
                enemyList[i].hp -= 1
                delete bulletList[key];
                if(enemyList[i].hp === 0){
                    generateBonus(enemyList[i]);
                    delete enemyList[i];
                    score += 100;
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
            if(bonusList[key3].category === 'atkSpd'){
                player.atkSpd += 2;
                if(player.atkSpd > 21){
                    player.atkSpd =21;
                    timeUpgrading += 300;
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
                    delete bossList[key2];
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
    ctx.font = "15px Georgia";
    ctx.fillText("Score :" +score,50,20);
    ctx.fillText("Level :" + level, 350,20);
}
function drawImg(actor){
    
    ctx.drawImage(actor.img,0,0);
}

update();

