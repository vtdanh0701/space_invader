var ctx = document.getElementById('ctx').getContext('2d');
const WIDTH = 500;
const HEIGHT = 500;
var player ={
    x: 250,
    y: 500,
}
var bulletList ={};
var bulletSpeed = 0;
var enemyXSpeed = 0;
var enemyYSpeed= 0;
var frame = 0;

var enemyList ={};
function createEnemy(xSpeed,ySpeed,x,y,id){
    var enemy = {
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        x: x,
        y: y,
        id: id
    }
    enemyList[id] = enemy;
}
function randomEnemy(){
    var xSpeed = 0;
    var ySpeed = 0;
    var x = Math.random()*WIDTH;
    var y = 0;
    var id = Math.random()
    createEnemy(xSpeed,ySpeed,x,y,id);
}
function createBullet(ySpeed,x,y,height,width,id){
    var bullet = {
        ySpeed : ySpeed,
        x: x,
        y: y,
        height : height,
        width: width,
        id: id
    }
    bulletList[id] = bullet;
}
function generateBullet(){
    var ySpeed = 5
    var x = player.x;
    var y = player.y;
    var height = 10;
    var width = 10;
    var id = Math.random();
    createBullet(ySpeed,x,y,height,width,id);
}
function drawBullet(b){
    b.ySpeed +=5
    ctx.fillRect(b.x, b.y -b.ySpeed ,b.width ,b.height)
}
var enemies1 = {
    xSpeed: 0,
    ySpeed: 0,
    x: Math.random()*WIDTH,
    y: 40
}
var enemies2 = {
    xSpeed: 0,
    ySpeed: 0,
    x: Math.random()*WIDTH,
    y: 40
}
var enemies3 = {
    xSpeed: 0,
    ySpeed: 0,
    x: Math.random()*WIDTH,
    y: Math.random()*(HEIGHT/3)
}

function drawPlayer(){
    ctx.beginPath();
    ctx.moveTo(player.x,player.y);
    ctx.lineTo(player.x-25,player.y+50);
    ctx.lineTo(player.x+25,player.y+50);
    ctx.closePath();
    ctx.stroke();
}

function drawEnemy(enemy){
    enemy.xSpeed += 1;
    enemy.ySpeed += 1;
    var enemyX = enemy.x+25+enemy.xSpeed;
    var enemyY = 40 + enemy.ySpeed;
    ctx.beginPath();
    ctx.moveTo(enemy.x+enemy.xSpeed,enemy.y+enemy.ySpeed);
    ctx.lineTo(enemy.x+25+enemy.xSpeed,enemy.y+40+enemy.ySpeed);
    ctx.lineTo(enemy.x+50+enemy.xSpeed,enemy.y+enemy.ySpeed);
    ctx.closePath();
    ctx.stroke();
    var distX = enemyX - player.x;
    var distY = enemyY - player.y;
    if(distX > 0){
        enemy.xSpeed -= 2;
    }
    else{
        enemy.xSpeed += 1;
    }
    if(distY > 0){
        enemy.ySpeed -= 3;
    }
}

document.onmousemove = function(mouse){
    var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;;
    var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
    
        if(mouseX > WIDTH-25)
                mouseX = WIDTH-25;
        if(mouseX < 25)
                mouseX = 25;
        if(mouseY > HEIGHT -50 )
                mouseY = HEIGHT - 50 ;
        if(mouseY < 25)
                mouseY = 0;
    player.x = mouseX;
    player.y = mouseY;
}

update = function(){
    ctx.clearRect(0,0,500,500);
    frame++ 
    if(frame % 500 === 0){
        console.log("this is frame " + frame);
        randomEnemy();
    }
    if(frame % 10 === 0){
        generateBullet();
    }
    for(var key in enemyList){
        drawEnemy(enemyList[key]);
    }
    for(var key in bulletList){
        drawBullet(bulletList[key]);
    }
    drawPlayer();
    drawEnemy(enemies1);
    drawEnemy(enemies2);
    drawEnemy(enemies3);
    requestAnimationFrame(update);
}

update();