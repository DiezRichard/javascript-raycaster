function drawIsoMap(ctx)
{
 
 /*
 const testMap= [
      
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99],
      [1,2,3,4,5,6,7,8,9,99]];
  */    
      
let oX=-50*player.tileX;
let oY=25*player.tileY;
   
  
  for(let i=0;i<level.floor.length;i++)
  {
   let yy=oY+25*i;
   
    for(let u=0;u<level.floor.length;u++)
  {
    let x=oX-50*i+50*u;
    let y=yy+25*u;
    
   let tile=tileSelector(level.floor[i][u]);
    
 ctx.fillStyle = ctx.createPattern(tile, "repeat");
  ctx.beginPath();
  
 // let x = screenWidth / 2 - 50;
 // let y = 25;
  ctx.moveTo(x, y);
  
  ctx.lineTo(x + 50, y - 25);
  
  ctx.lineTo(x + 100, y);
  
  ctx.lineTo(x + 50, y + 25);
  
  ctx.lineTo(x + 0, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
 
  }//u
  
  }//i

}//draw Isometric Map


//---------------------------// 
//---------------------------// 
//---------------------------// 
//---------------------------// 

function createIsoCoords()
{
  let outer=[];
  
  for(let i=0;i<mapSize;i++)
  {
    let inner=[];
     let oX=i*50;
     let oY=-i*25+50;
   
  for(let u=0;u<level.floor.length;u++)
  {
    let x1=(oX-50*u)/-50;
    let y1=(oY-25*u)/25;
    let coords={x:x1,y:y1};
    
    inner.push(coords);
    
  }//u
  
  outer.push(inner);
  
  }//i
  
  return outer;
  
}//isoMapCoords

//---------------------------// 
//---------------------------// 
//---------------------------// 
//---------------------------//

function drawIsoSprites()
{

//drawPlayer
ctxSprites.drawImage(invader,0,0,32, 32, 160-32,160-32,64,64);

for(let s of sprites)
  {
    
    if(s.type=="plant")
    {
       s.calculate();
       
       
    let isoX=Math.floor(s.x/tileSize);
    let isoY=Math.floor(s.y/tileSize);
      
   let x1=isoMapCoords[isoY][isoX].x*-50;
    let y1=isoMapCoords[isoY][isoX].y*25;
 
let px= Math.floor(player.x/tileSize);
let py=Math.floor(player.y/tileSize);

let px1=isoMapCoords[py][px].x*-50;
let py1=isoMapCoords[py][px].y*25;

ctxSprites.drawImage(tree,0,0,100, 100,x1-px1+160-25,y1-py1+160-25-25,64,64);
    }
  }//for s of sprites
  
  
}
