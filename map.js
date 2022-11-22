           //DRAW MAP//
           
    //Draw the map
    function drawMap()
    {
      let ctx1 = ctxMap;
      
      let texHeight = 260;
      let texWidth = 260;
      let texture;
      let x1 = Math.floor(player.x / tileSize) * tileSize;
      let y1 = Math.floor(player.y / tileSize) * tileSize;
      let x2 = x1 + tileSize;
      let y2 = y1 + tileSize;
      let xCoord = (x2 / tileSize) - 1;
      let yCoord = (y2 / tileSize) - 1;
      
      
//draw the tiles
for (y = 0; y < mapSize; y++)
{
for (x = 0; x < mapSize; x++)
{
      
let map = level.floor[y][x];
//draw Limit for front and back
//improves speed
let lim = 7;
if (x - xCoord <= lim && y - yCoord <= lim && xCoord - x <= lim && yCoord - y <= lim)
{
  texture=tileSelector(map);
  texWidth=200;
  texHeight=200;
      
ctx.drawImage(texture, 0, 0, texWidth, texHeight,x*tileSize-player.x,y* tileSize-player,tileSize,tileSize);

          }; //draw limit      
        }; //x loop
      
      }; //y loop
      /*
      let ctx=ctxMap;
      let scale=1;
      let texHeight = 260;
      let texWidth =260;
      let texture = groundStone;
let px=Math.floor(player.x/tileSize);
let py=Math.floor(player.y/tileSize);
                        
           
      //draw the tiles
      for(let y=0;y<mapSize;y++)
      {
      	for(let x=0;x<mapSize;x++)
      {

if (level.floor[y][x] == 2)
{

 texHeight = 260;
 texWidth =260;
 texture = groundStone;

};

if (level.floor[y][x] == 3)
{

  texHeight = 300;
  texWidth = 300;
  texture = stoneDark;

};


if (level.floor[y][x] == 1)
{

 texHeight = 255;
 texWidth = 255;
 texture= dirt;
};

if (level.floor[y][x]== 0)
{

 texHeight = 225;
 texWidth = 225;
 texture=grass;

};

  //doors
  if (level.doors[y][x] >0)
  {

    texHeight = 300;
    texWidth = 300;
    texture = woodPlank;
    
  };
  

  
    //doors
    if (level.base[y][x] == 3)
    {
  
      texHeight = 300;
      texWidth = 300;
      texture = stoneDark;
  
    };
        
  // the drawing
  ctx.drawImage(texture, 0, 0, texWidth, texHeight,x*tileSize-player.x,y* tileSize-player.y,tileSize,tileSize);
  
   
		
		     
      };//x loop
      
      };// y loop
      */
    };//draw map
 
/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//map grid   
function drawGrid()
{
  let ctx=ctxMap;
  let scale=1;
	ctx.strokeStyle="black";
	for(i=0;i<mapSize;i++){
		for(u=0;u<mapSize;u++){
	
	ctx.moveTo(u*tileSize*scale,i*tileSize*scale);
	ctx.lineTo(u*tileSize*scale,320*scale);
	ctx.stroke();
	
	};
	};
	for (let i = 0; i < mapSize; i++) {
		for (let u = 0; u < mapSize; u++) {
	ctx.beginPath();
	ctx.moveTo(u * tileSize*scale, i * tileSize*scale);
	ctx.lineTo(320*scale, i * tileSize*scale);
	ctx.stroke();
	ctx.closePath();
	
};
};

};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//draw a point on the map
function drawPlayer()
{
  let ctx=ctxMap;

  //player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x - 5, player.y - 5, 10, 10);
  
  let cos = Math.cos(player.angle);
  let sin = Math.sin(player.angle);
  //orientation
  ctx.strokeStyle="red";
  ctx.beginPath();
  ctx.moveTo(player.x,player.y);
  ctx.lineTo(player.x+cos*20,player.y+sin*20);
  ctx.stroke();
  ctx.closePath();
};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawSpritesMap()
{
   let ctx= ctxMap;
   let texWidth=0;
   let texHeight=0;
   let sprite;
   
   
   
  //draw the sprites on the map
  for(let y=0;y<mapSize;y++)
  {
  for(let x=0;x<mapSize;x++)
  {
  //sprites alive
  if(level.sprites[y][x]>0)
  {
    //select sprite
    
    if (level.sprites[y][x] == 2)
    {
      sprite = tree;
      texWidth = 100;
      texHeight = 100;
      ctx.fillStyle="green";
    }
   
//ctx.fillRect(x*tileSize,y*tileSize,32,32);

 ctx.drawImage(sprite,0,0,texWidth,texHeight,x*tileSize,y*tileSize,tileSize,tileSize); 

  };//spritew check
  
  }; //x loop
  };//y loop
  

};//draw sprites on map

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function drawSpritesOnMap2()
{
  let ctx= ctxMap;
  
  for(let s of sprites)
  {
    
    let xcoord=Math.floor(s.x/tileSize)*tileSize;
    let ycoord=Math.floor(s.y/tileSize)*tileSize;
    
    if(s.isActive || s.type!="enemy")
    {
       s.calculate();

       ctx.drawImage(s.img,0,0,s.width, s.height, s.x-16-player.x,s.y-16-player.y,tileSize,tileSize);
    }
  }//for s of sprites
  
  
  
}//draw Sprites 2
