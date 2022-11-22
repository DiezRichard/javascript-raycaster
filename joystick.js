 //JOYSTICK V5//

function joystick()
{

let playerX =Math.floor(player.x/tileSize);
let playerY=Math.floor(player.y/tileSize);


if(!isMapOn)
{
let cos = Math.cos(player.angle);
let sin = Math.sin(player.angle);


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//TURN RIGHT
if(touchX>rgtBtn.x1 && touchY > rgtBtn.y1 && touchX < rgtBtn.x2 && touchY < rgtBtn.y2 || touchX2>rgtBtn.x1 && touchY2 > rgtBtn.y1 && touchX2 < rgtBtn.x2 && touchY2 < rgtBtn.y2)
{


//floor rotation
ctxFloorMap.rotate(-rotation);
ctxRoofMap.rotate(-rotation);
//ctxMap.rotate(-rotation);

//prevents going out of range
if (player.angle >= Math.PI*2)
{
	player.angle = 0;
};

//angle increment
player.angle += rotation;

if (isShooting)
{

shootingXAxis -= player.speed * 10;

} else { shootingXAxis = 150; };


};//TURN RIGHT

//-----------------------------//

//TURN LEFT
if (touchX > lftBtn.x1 && touchY > lftBtn.y1 && touchX < lftBtn.x2 && touchY < lftBtn.y2 || touchX2 > lftBtn.x1 && touchY2 > lftBtn.y1 && touchX2 < lftBtn.x2 && touchY2 < lftBtn.y2)
{

ctxFloorMap.rotate(rotation);
ctxRoofMap.rotate(rotation);

//ctxMap.rotate(rotation);
	
//prevents going out of range 
if (player.angle/z <1)
{
player.angle= Math.PI*2;
};

//angle decrement
player.angle -= rotation;
		
if (isShooting) 
{

shootingXAxis += player.speed * 10;

} else { shootingXAxis = 150; };


};
//TURN LEFT

//---------------------------//

//UP
if(touchX>upBtn.x1 && touchY > upBtn.y1 && touchX < upBtn.x2 && touchY < upBtn.y2 || touchX2>upBtn.x1 && touchY2 > upBtn.y1 && touchX2 < upBtn.x2 && touchY2 < upBtn.y2)
{

let na= correctAngle(player.angle,player.x,player.y);
let pass=collision2(na,"up",player.x,player.y);

if(pass)
{
let cos = Math.cos(na);
let sin = Math.sin(na);

player.x += cos * player.speed;
player.y += sin * player.speed;

player.tileX = isoMapCoords[playerY][playerX].x;
player.tileY = isoMapCoords[playerY][playerX].y;

}

};//UP

//-----------------------------//

//DOWN
if(touchX>dwnBtn.x1 && touchY > dwnBtn.y1 && touchX < dwnBtn.x2 && touchY < dwnBtn.y2 || touchX2>dwnBtn.x1 && touchY2 > dwnBtn.y1 && touchX2 < dwnBtn.x2 && touchY2 < dwnBtn.y2)
{

let pass= collision2(player.angle,"down",player.x,player.y);

if(pass)//ray2.rayPos==0)
{
player.x -= cos * player.speed;
player.y -= sin * player.speed;

player.tileX = isoMapCoords[playerY][playerX].x;
player.tileY = isoMapCoords[playerY][playerX].y;

}
else
{

let na=slideDown(player.angle,player.x,player.y);

let pass2= collision2(na,"down",player.x,player.y);

//slide
if(pass2)
{
let cos = Math.cos(na);
let sin = Math.sin(na);

player.x -= cos * player.speed;
player.y -= sin * player.speed;


player.tileX = isoMapCoords[playerY][playerX].x;
player.tileY = isoMapCoords[playerY][playerX].y;

}//slide

}//if didn'pass

};//DOWN

//---------------------------//


//---------------------------//

//STRAFE RIGHT
if (touchX > stRgtBtn.x1 && touchY > stRgtBtn.y1 && touchX < stRgtBtn.x2 && touchY < stRgtBtn.y2 || touchX2 > stRgtBtn.x1 && touchY2 > stRgtBtn.y1 && touchX2 < stRgtBtn.x2 && touchY2 < stRgtBtn.y2)
{
let na= player.angle;
let pass=collision2(na,"right",player.x,player.y);

if(pass)
{
player.y += cos * player.speed/2;
player.x -= sin * player.speed/2;

player.tileX = isoMapCoords[playerY][playerX].x;
player.tileY = isoMapCoords[playerY][playerX].y;

}

if (isShooting)
{

shootingXAxis -= player.speed * 2;

} else { shootingXAxis = 150; };


}; //strafe right


//---------------------------//


//STRAFE LEFT
if (touchX > stLftBtn.x1 && touchY > stLftBtn.y1 && touchX < stLftBtn.x2 && touchY < stLftBtn.y2 || touchX2 > stLftBtn.x1 && touchY2 > stLftBtn.y1 && touchX2 < stLftBtn.x2 && touchY2 < stLftBtn.y2)
{
let na=player.angle;
let pass=collision2(na,"left",player.x,player.y);
if(pass)
{
player.y -= cos * player.speed/2;
player.x += sin * player.speed/2;

player.tileX=isoMapCoords[playerY][playerX].x;
player.tileY=isoMapCoords[playerY][playerX].y;

};

if (isShooting)
{

shootingXAxis += player.speed * 2;
} else { shootingXAxis = 150; };

}; //STRAFE LEFT



if(!isActioning)
{
//ACTION
if (touchX > actionBtn.x1 && touchY > actionBtn.y1 && touchX < actionBtn.x2 && touchY < actionBtn.y2 || touchX2 > actionBtn.x1 && touchY2 > actionBtn.y1 && touchX2 < actionBtn.x2 && touchY2 < actionBtn.y2)
{
 
isActioning=true;

window.setTimeout(function(){
 
isActioning=false;

},500)

}; //ACTION
};//isActioning

}//!isMapOn

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

else

//ISOMETRIC// 

if(isMapOn)
{

ctxMap.clearRect(-10000, -10000, 20000, 20000);
ctxMain.clearRect(-10000, -10000, 20000, 20000);

//UP
if(touchX>upBtn.x1 && touchY > upBtn.y1 && touchX < upBtn.x2 && touchY < upBtn.y2 || touchX2>upBtn.x1 && touchY2 > upBtn.y1 && touchX2 < upBtn.x2 && touchY2 < upBtn.y2)
{

let pass=collision2(z*4,"right",player.x,player.y+32);

if(pass){
player.y+=(tileSize);
player.tileY-=1;
player.tileX-=1;
}
};//UP

//-----------------------------//

//DOWN
if(touchX>dwnBtn.x1 && touchY > dwnBtn.y1 && touchX < dwnBtn.x2 && touchY < dwnBtn.y2 || touchX2>dwnBtn.x1 && touchY2 > dwnBtn.y1 && touchX2 < dwnBtn.x2 && touchY2 < dwnBtn.y2)
{
  
let pass = collision2(z*4, "left", player.x, player.y);

if (pass) {
player.y -= (tileSize);
player.tileY+=1;
player.tileX+=1; 
}
};//DOWN

//---------------------------//

// LEFT
if (touchX > lftBtn.x1 && touchY > lftBtn.y1 && touchX < lftBtn.x2 && touchY < lftBtn.y2 || touchX2 > lftBtn.x1 && touchY2 > lftBtn.y1 && touchX2 < lftBtn.x2 && touchY2 < lftBtn.y2)
{

let pass = collision2(z*4, "up", player.x+32, player.y);

if (pass) {

player.x += (tileSize);
player.tileX+=1;
player.tileY-=1;
}
};// LEFT

//-----------------------------//

  // RIGHT
if(touchX>rgtBtn.x1 && touchY > rgtBtn.y1 && touchX < rgtBtn.x2 && touchY < rgtBtn.y2 || touchX2>rgtBtn.x1 && touchY2 > rgtBtn.y1 && touchX2 < rgtBtn.x2 && touchY2 < rgtBtn.y2)
{

let pass = collision2(z*4, "down", player.x, player.y);

if (pass) {
player.x -= (tileSize);
player.tileX-=1;
player.tileY+=1;
}
};// RIGHT

//---------------------------//

}//is map on

};//end joystick function

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawJoystick(ctx)
{
	
	 ctx.fillStyle = "black";
	 ctx.fillRect(0, 0, 320, 320);
	
	ctx.shadowBlur = 20;
	ctx.shadowColor = "white";
	ctx.strokeStyle="white";
	ctx.beginPath();
ctx.rect(upBtn.x1-offsetXJ,upBtn.y1-320,40,40);
ctx.rect(dwnBtn.x1-offsetXJ,dwnBtn.y1-320,40,40);
ctx.rect(lftBtn.x1-offsetXJ,lftBtn.y1-320,40,40);
ctx.rect(rgtBtn.x1-offsetXJ,rgtBtn.y1-320,40,40);
ctx.rect(stLftBtn.x1-offsetXJ,stLftBtn.y1-320,80,80);
ctx.rect(stRgtBtn.x1-offsetXJ,stRgtBtn.y1-320,80,80);


ctx.rect(actionBtn.x1-offsetXJ,actionBtn.y1-320,80,80);



	ctx.stroke();
	ctx.closePath();
	
	ctx.fillStyle="blue";
	ctx.font="50px Verdana";
	ctx.fillText("A",223,75);
	
	
	//restore values
	ctx.shadowBlur = 0;
};


//---------------------------//
