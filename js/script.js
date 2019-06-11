var ctx = document.getElementById('ctx').getContext('2d');
const WIDTH = 500;
const HEIGHT = 500;
var player ={
    x: 250,
    y: 450,
    width: 20,
    height: 60,
    color: "green",
    atkSpd: 3
}
var timeWhenStart = Date.now();
var bulletList ={};
var enemyList ={};
var bossList ={};
var bonusList ={};
var score = 0;
var frame = 0;
var boss = false;

function createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,id){
    var enemy = {
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        hp : hp,
        id: id
    }
    enemyList[id] = enemy;
}
function createBoss(xSpeed,ySpeed,x,y,width,height,color,hp,id){
    var boss = {
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        hp : hp,
        id: id
    }
    bossList[id] = boss;
}
function summonBoss(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 1+ Math.random()*3;
    var x = 250
    var y = 0;
    var width = 100;
    var height = 40;
    var color = "pink";
    var hp = 500;
    var id = Math.random()
    createBoss(xSpeed,ySpeed,x,y,width,height,color,hp,id);
}
function randomEnemy1(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 1+ Math.random()*3;
    var x = Math.random()*WIDTH;
    var y = 0;
    var width = 60;
    var height = 20;
    var color = "red";
    var hp = 1;
    var id = Math.random()
    createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,id);
}
function randomEnemy2(){
    var xSpeed = -2 + Math.random()*3;
    var ySpeed = 1+ Math.random()*3;
    var x = Math.random()*WIDTH;
    var y = 0;
    var width = 60;
    var height = 20;
    var color = "blue";
    var hp = 3;
    var id = Math.random()
    createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,id);
}
function randomEnemy3(){
    var xSpeed = 1;
    var ySpeed = 1;
    var x = Math.random()*WIDTH;
    var y = 0;
    var width = 80;
    var height = 20;
    var color = "orange";
    var hp = 20;
    var id = Math.random()
    createEnemy(xSpeed,ySpeed,x,y,width,height,color,hp,id);
}
function createBullet(ySpeed,x,y,height,width,color,id){
    var bullet = {
        ySpeed : ySpeed,
        x: x,
        y: y,
        height : height,
        width: width,
        color: color,
        id: id
    }
    bulletList[id] = bullet;
}
function generateBullet(){
    var ySpeed = player.atkSpd;
    var x = player.x;
    var y = player.y;
    var height = 10;
    var width = 4;
    var color = "black";
    var id = Math.random();
    createBullet(ySpeed,x,y,height,width,color,id);
}
function createBonus(x,y,width,height,color,category,id){
    var bonus ={
        x:y,
        y:y,
        width: width,
        height: height,
        color: color,
        category: category,
        id: id
    }
    bonusList[id] = bonus;
}
function generateBonus(){
    var x = Math.random()*WIDTH;
    var y = Math.random()*HEIGHT;
    var width = 10;
    var height = 10;
    var id = Math.random();
    if(Math.random()<0.5){
        var category = 'score';
        var color = 'orange';
    } 
    else {
            var category = 'atkSpd';
            var color = 'purple';
    }
    createBonus(x,y,width,height,color,category,id);
}


function drawActor(actor){
    ctx.save();
    ctx.fillStyle = actor.color;
    ctx.fillRect(actor.x-actor.width/2,actor.y-actor.height/2,actor.width,actor.height);
    ctx.restore();
}
 function updateChasingEnemyPosition(enemy){
        enemy.x += enemy.xSpeed;
        enemy.y += enemy.ySpeed;
        var distX = enemy.x - player.x;
        var distY = enemy.y - player.y;
        if(distX > 0){
            enemy.x -= enemy.xSpeed+1;
        }
        else if(distX <= 0){
            enemy.x += enemy.xSpeed;
        }
        if(distY > 0){
            enemy.y -= enemy.ySpeed;
        }
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
 }
 function updateBullet(bullet){
     drawActor(bullet);
     updateBulletPosition(bullet);
 }

 function updateChasingEnemy(enemy){
     drawActor(enemy);
     updateChasingEnemyPosition(enemy);
 }
 function updateRandomEnemy(enemy){
     drawActor(enemy);
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
    ctx.clearRect(0,0,500,500);

    frame++ 
    var timePlaying = Date.now()-timeWhenStart;
    console.log(timePlaying)
    if(timePlaying > 45000 && frame % 2700 === 0){
        boss = true;
        summonBoss();
    }
    if(timePlaying > 15000 && frame % 200 === 0 && boss === false){
        randomEnemy2();
    }
    if(timePlaying > 30000 && frame % 500 === 0 && boss === false){
        randomEnemy3();
    }
    if(frame % 100 === 0 && boss === false){
        randomEnemy1();
    }
    if(player.atkSpd === 2 && frame % 400 === 0){
        generateBullet();   
    }
    if(player.atkSpd > 1 && frame % Math.round(50/player.atkSpd) === 0){
        generateBullet();
    }
    if(frame % 500 === 0){
        generateBonus();
    }
    for(var key in enemyList){
        updateRandomEnemy(enemyList[key]);
        var isCollision = testCollisionEntity(player,enemyList[key]);
        if(isCollision){
            console.log("boom!!!");
            delete enemyList[key];
        }
    }
    for(var key in bossList){
        updateRandomEnemy(bossList[key]);
        var isCollision = testCollisionEntity(player,bossList[key]);
        if(isCollision){
            console.log("hit by boss!!!");
        }
    }
    for(var key in bulletList){
        updateBullet(bulletList[key]); 
        for(var i in enemyList){
            var hit = testCollisionEntity(bulletList[key],enemyList[i]);
            if(hit){
                enemyList[i].hp -= 1
                console.log("hit");
                delete bulletList[key];
                if(enemyList[i].hp === 0){
                    delete enemyList[i];
                }
                break;
            }
        }   
    }
    for(var key in bulletList){
        for(var j in bossList){
            var hit = testCollisionEntity(bulletList[key],bossList[j]);
            if(hit){
                bossList[j].hp -= 1
                console.log("hit");
                delete bulletList[key];
                if(bossList[j].hp === 0){
                    delete bossList[j];
                    boss = false;
                }
                    break;
                
            }
        }
    }
    for(var key in bonusList){
        drawActor(bonusList[key]);
        var isCollision = testCollisionEntity(player,bonusList[key]);
        if(isCollision){
            if(bonusList[key].category === 'score')
                score +=1000;
                console.log(score);
            if(bonusList[key].category === 'atkSpd'){
                player.atkSpd += 2;
                console.log(player.atkSpd)
                if(player.atkSpd > 16){
                    player.atkSpd =16;
                }
            }
            delete bonusList[key];
        }
    }

    drawActor(player);
    requestAnimationFrame(update);
}

update();

