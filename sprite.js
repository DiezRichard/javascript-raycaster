//defines sprite class
class Sprite
 {
	
	constructor(x,y,img,width,height){
	this.x = x;
this.y = y;
this.img = img;
this.distance = 0;
this.isVisible = false;
this.height = height;
this.width = width;
this.angle=0;
this.type;
this.name;
this.isAlive = true;
this.life = 100;
this.defense = 10;
this.steps = 0;
this.direction = "";
this.isAttacking = false;
this.contour;
this.shadow;
this.isUnderAttack = false;
this.isActive=false;
this.isMoving=false;
this.isAnimating=false;

	};//constructor
	
calculate()
{
	this.dx=this.x-player.x;
	this.dy=this.y-player.y;
	this.atan= parseInt(Math.atan(this.dy/this.dx)/z);
	this.distance=parseInt(Math.sqrt(this.dx*this.dx+this.dy*this.dy));

this.angleDiff=parseInt(player.angle/z-this.atan);
	
if(this.angleDiff>180)
{
	this.angleDiff-=360;
};

if(player.x>this.x)
{
	
	this.angleDiff+=180;
	if (this.angleDiff > 180)
	{
		this.angleDiff -= 360;
	};
};
	
		if (Math.abs(this.angleDiff) < 30 && this.distance<drawDist && this.distance>20)
		{
			this.isVisible = true;
		}
		else
		{
			this.isVisible = false;
		};
	
 };//end Calculate
 
//---------------------------//
 
draw()
{ 
this.calculate();
 
if(this.isVisible)
{	
 let spriteHeightP = (tileHeight / this.distance)* proyectPlane;


//calculate Y
let y0 =parseInt((320 / 2) - (spriteHeightP / 2));

let y1 = parseInt(y0 + spriteHeightP);

let viewDist = screenWidth;
let spriteHeight = this.height;
let spriteWidth = this.width;
let alturaTextura = y0 - y1;
let anchuraTextura = alturaTextura;
let anchuraColumna = alturaTextura / spriteHeight;
 	
let size=parseInt(9000/this.distance);

//let pixel = spriteHeight/size;
let yf=parseInt(320/2-size/2);

//calculate X
let dx =(this.x - player.x);
let dy = (this.y - player.y);
 	
let spriteAngle =Math.atan2(dy, dx) - player.angle;

let x0 = parseInt(Math.tan(spriteAngle) * viewDist);

let x = parseInt(320 / 2 + x0 - anchuraTextura / 2);

for (let i = 0; i < spriteWidth; i++) 
{
for(let j=0; j<anchuraColumna; j++)
{
	let x1 = parseInt(x+((i-1)*anchuraColumna)+j);	
					
 	
if(zBuffer[x1] > this.distance) 
{

let ctx=ctxSprites;


if(shadowOn)
{
let shadowDist=50/this.distance;
ctx.globalAlpha=shadowDist;
//ctx.shadowBlur=1;
}//shadowOn


ctx.drawImage(this.img, i, 0, 1, spriteHeight, x1, yf, 1, size);
 	
 ctx.globalAlpha = 1;
 ctx.shadowBlur = 0;	

//shadow img
if(this.shadow!=null)
{
let shadowDist=this.distance/100;
ctx.globalAlpha = shadowDist;
//ctx.shadowBlur = 1;


ctx.drawImage(this.shadow, i, 0, 1, spriteHeight, x1, yf, 1, size);

ctx.globalAlpha = 1;
ctx.shadowBlur = 0;
}//shadowOn

/*
if(this.img==invader)
{
//contour
let diff= Math.abs(this.angleDiff)

if(diff<5 && this.distance<150)
{

if (this.img == invader)
{
this.contour = invaderContour;
}

ctx.globalAlpha =.3;
//ctx.shadowBlur = 1;

ctx.drawImage(this.contour, i, 0, 1, spriteHeight, x1, yf, pixel, size);

ctx.globalAlpha = 1;
ctx.shadowBlur = 0;

}//contour
}//if ShadowOn
*/
};//zbuffer
};// j for
};// i for
};
};
 
}; //end class Sprite


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

/*
//CREATE SPRITES
function createSprites()
{

 //center of a tile
 let center = tileSize / 2;
 let a= new Sprite();
 let mapSize=level.sprites.length;
 let sprite;
 let spriteH;
 let spriteW;
 
for(let y=0;y<mapSize;y++)
{
 for(let x=0;x<mapSize;x++)
 {
 
 let isThereASprite=false;

//select sprite
if (level.sprites[y][x] == 2)
{

sprite = tree;
spriteH = 100;
spriteW = 100;
isThereASprite=true;

};

//create sprite
if(isThereASprite)
{
a= new Sprite(x * tileSize + center, y * tileSize + center, sprite,spriteH, spriteW);
 
a.type="plant";
 //adds sprite to sprite array
 sprites.push(a);
};

 };// x loop
}; //y loop

for(let e of level.enemies)
{
e.type="enemy";
sprites.push(e);
}

}// createSprites
*/

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//addSpritesTolist
function createSpritesList()
{
for(let e of level.enemies)
{
sprites.push(e);
}

for (let s of level.sprites)
{
sprites.push(s);
}
 
}

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//DRAW SPRITES
function drawSprites()
{
let count=0;
for(let s of sprites)
{
  
if(s.type=="plant")
{
 s.draw();
}
 
if(s.type=="enemy" && s.isAlive && count<4)
 {
 s.draw();
 s.isActive=true;
 count++;
 }
 
 if(s.type=="portal")
 {
   s.draw();
 }
}
	
};//end drawSprites

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//ORDER SPRITES
function orderSprites()
{

let closer=new Sprite();
let a=new Array(1);

for(let j=0;j<mapSize;j++)
{
for(let i=0;i<sprites.length;i++)
{
 
//LIMIT
if(i==sprites.length-1)
 {break;}else{

let next= i+1;

//ORDER SPRITES
if(parseInt(Math.abs(sprites[i].distance))<parseInt(Math.abs(sprites[next].distance)))
{
 a=sprites.splice(next,1);
 closer=a[0];
 
 sprites.unshift(closer);
 
}//compare lengths

}//else limit
}//forloop
};//j loop
};// end orderSprites

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function animateSprites()
{
  
for(s of level.sprites)
{
if(s.isAnimating==false)
{
  
//PORTAL
 if(s.type=="portal")
 { 
 
 s.isAnimating=true;
 
 for (let i = 0; i < portalAnimation.length; i++)
 {

   window.setTimeout(function() {
 
     s.img = portalAnimation[i];
     
     if(i>=portalAnimation.length-1)
     {
       s.isAnimating=false;
     }
   }, 100*i);
 }
}//PORTAL
}


}
}//animate sprite 
