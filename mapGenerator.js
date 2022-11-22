function generateMap(size)
{
let outer=[];

for(let y=0;y<size;y++)
{
let inner=[];
 
for(let x=0;x<size;x++)
{

 //SIDE LIMITS OF THE MAP 
if(y==0 || y==size-1 || x==0 || x==size-1 )
{
inner.push(10);
}
else { inner.push(0);}


 //inner.push(0);

}//x loop
outer.push(inner);

}//y loop


return outer;
}//map generator

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function generateBuilding()
{
//random size of the building
let rndSizeX=Math.floor(Math.random()*3)+3;

let rndSizeY=Math.floor(Math.random()*3)+3;

//random texture select
let rndTexture=1;//Math.floor(Math.random()*5)+2;


let outer = [];

for (let y = 0; y < rndSizeY; y++)
{
let inner = [];

for (let x = 0; x < rndSizeX; x++)
{

//walls
if ((y == 0 || y == rndSizeY - 1) || (x == 0 || x == rndSizeX - 1))
{
inner.push(rndTexture);
}
//air
else 
{ 
inner.push(0);
}

} //x loop

outer.push(inner);

} //y loop

return outer;
}//building generator

//////////////////////////
//----------------------//
//////////////////////////

//generates a building to enter a cave or a dungeon or a maze
function generateEntrance()
{
//random size of the building
let rndSizeX=3;

let rndSizeY=3;

//random texture select
let rndTexture=1;//Math.floor(Math.random()*5)+2;


let outer = [];

for (let y = 0; y < rndSizeY; y++)
{
let inner = [];

for (let x = 0; x < rndSizeX; x++)
{

//walls
if ((y == 0 || y == rndSizeY - 1) || (x == 0 || x == rndSizeX - 1))
{
inner.push(rndTexture);
}
//air
else 
{ 
inner.push(0);
}

} //x loop

outer.push(inner);

} //y loop

return outer;
};//entrance building generator

//////////////////////////
//----------------------//
//////////////////////////

//generates the portal to enter a maze/dungeon/cave
function generatePortal(building,n)
{


let type;
let b=building;
let sizeY=b.length;
let sizeX=b[0].length;
let doors= generateMap2(sizeX,sizeY);
let switches =generateMap2(sizeX,sizeY);

//to generate the respective level with its coords asociated.
let px=0;
let py=0;
//----------------------//

//cave
if(n==0)
{
  type=-1;
}

//dungeon
if(n==1)
{
  type=-2;
  
}

//maze
if(n==2)
{
  type=-2;
  
}

//tomb
if(n==3)
{
  type=-2;
  
}

//----------------------//

//random door orientation
let doorOrientation=Math.floor(Math.random()*2);

 //random door wall side 
 let doorSide = Math.floor(Math.random() * 2);

 
//----------------------// 
let isADoor=false;

//----------------------//

for(let y=0;y<sizeY;y++)
{
 
for(let x=0;x<sizeX;x++)
{ 
 
 if(b[y][x]>0 && !isADoor)
{

if(doorOrientation==0)
{

if(doorSide==0 && x==doorSide && y>0 && y<sizeY-1 )
{
  doors[y][x] = 0;
  switches[y][x]=-2;
  px = x;
  py = y;
  b[y][x] = 0;
  isADoor = true;
  break;
  
}//side 0

if(doorSide==1 && x==sizeX-1 && y>0 && y<sizeY-1)
{
doors[y][x]=0;
switches[y][x]=-2;
px = x;
py = y;
b[y][x]=0;
isADoor=true;
break;
}//side 1


}//orientation


if (doorOrientation == 1)
{

if(doorSide==0 && y==doorSide && x>0 && x<sizeX-1)
{
doors[y][x] = 0;
switches[y][x]=-2;
px = x;
py = y;
b[y][x] = 0;
isADoor = true;
break;
};//side 0

if (doorSide == 1 && y == sizeY-1 && x>0 && x<sizeX-1)
{
doors[y][x] = 0;
switches[y][x]=-2;
px=x;
py=y;
b[y][x] = 0;
isADoor = true;
break;
}; //side 1


};//orientation

};//if
};//x
 
};//y

let bset=[b, doors,switches,px,py];

return bset;

}//portal generator

//////////////////////////
//----------------------//
//////////////////////////

//door generator
function generateDoors(building)
{
let b=building;
let sizeY=b.length;
let sizeX=b[0].length;
let doors= generateMap2(sizeX,sizeY);

//----------------------//

//random door orientation
let doorOrientation=Math.floor(Math.random()*2);

 //random door wall side 
 let doorSide = Math.floor(Math.random() * 2);
 
 //random door wall tile
 //let doorTile = Math.floor(Math.random()*2)+2;

 
//----------------------// 
let isADoor=false;

//----------------------//

for(let y=0;y<sizeY;y++)
{
 
for(let x=0;x<sizeX;x++)
{ 
 
 if(b[y][x]>0 && !isADoor)
{

if(doorOrientation==0)
{

if(doorSide==0 && x==doorSide && y>0 && y<sizeY-1 )
{
doors[y][x]=2;
b[y][x]=0;
isADoor=true;
break;
}//side 0

if(doorSide==1 && x==sizeX-1 && y>0 && y<sizeY-1)
{
doors[y][x]=2;
b[y][x]=0;
isADoor=true;
break;
}//side 1


}//orientation


if (doorOrientation == 1)
{

if(doorSide==0 && y==doorSide && x>0 && x<sizeX-1)
{
doors[y][x] = 1;
b[y][x] = 0;
isADoor = true;
break;
};//side 0

if (doorSide == 1 && y == sizeY-1 && x>0 && x<sizeX-1)
{
doors[y][x] = 1;
b[y][x] = 0;
isADoor = true;
break;
}; //side 1


};//orientation

};//if
};//x
 
};//y

let bset=[b, doors];

return bset;

};//doorGenerator

//////////////////////////
//----------------------//
//////////////////////////

//door switches generator
function generateSwitch(level)
{

let d=level.doors;

for(let y=0; y< d.length;y++)
{
for(let x=0;x<d[0].length;x++)
{

if(d[y][x]==1)
{

level.switches[y-1][x]=1;
level.switches[y+1][x]=1;
};//orientation 1 Y axis

if(d[y][x]==2)
{

level.switches[y][x+1]=2;
level.switches[y][x-1]=2;
};//orientation 2 X axis
};
};

}; //generate switches for doors

//////////////////////////
//----------------------//
//////////////////////////



//generates a map of different x & y values
function generateMap2(sizeX,sizeY)
{

let outer=[];

for(let y=0;y<sizeY;y++)
{
let inner=[];
 
for(let x=0;x<sizeX;x++)
{
inner.push(0);


};//x loop
outer.push(inner);

};//y loop


return outer;
};//map generator 2

//////////////////////////
//----------------------//
//////////////////////////

//Maze generator
function generateMaze(size,tile)
{

let base= generateMap(size);

let pointer={x:1,y:1};

let visitedCount=1;

let width=2;

let stack=[];

stack.push(pointer);

let p={x:stack[stack.length-1].x, y: stack[stack.length-1].y};

base[p.y][p.x]=tile;

let up = p.y - 1*width;
let down = p.y + 1*width;
let left = p.x - 1*width;
let right = p.x + 1*width;

//----------------------//

while(visitedCount<(size-2)/width*(size-2)/width)
{

let n=[];

if(up>0 && up<size-1 && base[up][p.x]==0)
{
 n.push(up);
}

if (down>0 && down<size-1 && base[down][p.x] == 0)
{ 
n.push(down);
}

if(left> 0 && left<size-1 && base[p.y][left] == 0)
{
n.push(left);
}

if (right> 0 && right<size-1 && base[p.y][right] == 0)
{
n.push(right);
}


if(n.length>0)
{
let r= randomNumber(n.length-1);

if(n[r]==up)
{
 base[up][p.x]=tile;
 
 if(width>1)
 {
 base[up+1][p.x]=tile;
 }
 
 let pointer={x:p.x,y:up};
 visitedCount+=1;
 stack.push(pointer);
}

if (n[r]==down)
{
base[down][p.x] = tile;

if (width > 1)
{
base[down - 1][p.x] = tile;
}

let pointer ={ x: p.x, y: down };
visitedCount+=1;
stack.push(pointer);
}

if (n[r]==left)
{
base[p.y][left] = tile;

if (width > 1)
{
base[p.y][left+1] = tile;
}

let pointer ={ x: left, y: p.y };
visitedCount+=1;
stack.push(pointer);
}

if (n[r]==right)
{
base[p.y][right] = tile;

if (width > 1)
{
base[p.y][right-1] = tile;

}

let pointer= { x: right, y: p.y };
visitedCount+=1;
stack.push(pointer);
}

}//can go somewhere
else // go back one step
{
stack.pop();
}

//update values
p={x:stack[stack.length-1].x, y: stack[stack.length-1].y};

up = p.y - 1*width;
down = p.y + 1*width;
left = p.x - 1*width;
right = p.x + 1*width;

};//loop



//fill spaces with walls
for (let i = 0; i < size; i++)
{
for (let u = 0; u < size; u++)
{
if (base[i][u] == 0)
{
base[i][u] = 1;
}
}
}

return base;


}//maze generator


//////////////////////////
//----------------------//
//////////////////////////



function generateMazeWalls(size,floor,tile)
{
let texture=tile;

let walls=generateMap(size);
//fill spaces with walls
for (let i = 0; i < size; i++)
{
for (let u = 0; u < size; u++)
{
if (floor[i][u] == 1 || floor[i][u]==10)
{
walls[i][u] = tile;
}
}
}

return walls;
}//generate maze walls


//////////////////////////
//----------------------//
//////////////////////////



function generateCave(size,tile)
{
  
let texture=tile;

let base= generateMap(size);

let pointer={x:1,y:1};

let visitedCount=1;

let width=1;

let stack=[];

stack.push(pointer);

let p={x:stack[stack.length-1].x, y: stack[stack.length-1].y};

base[p.y][p.x]=texture;

let up = p.y - 1*width;
let down = p.y + 1*width;
let left = p.x - 1*width;
let right = p.x + 1*width;

//----------------------//
let r=randomNumber(10)+5;
while(visitedCount<size*r)
{

let n=[];

if(up>0 && up<size-1 && base[up][p.x]==0)
{
 n.push(up);
}

if (down>0 && down<size-1 && base[down][p.x] == 0)
{ 
n.push(down);
}

if(left> 0 && left<size-1 && base[p.y][left] == 0)
{
n.push(left);
}

if (right> 0 && right<size-1 && base[p.y][right] == 0)
{
n.push(right);
}


if(n.length>0)
{
let r= randomNumber(n.length-1);

if(n[r]==up)
{
 base[up][p.x]=texture;
 
 if(width>1)
 {
 base[up+1][p.x]=texture;
 }
 
 let pointer={x:p.x,y:up};
 visitedCount+=1;
 stack.push(pointer);
}

if (n[r]==down)
{
base[down][p.x] = texture;

if (width > 1)
{
base[down - 1][p.x] = texture;
}

let pointer ={ x: p.x, y: down };
visitedCount+=1;
stack.push(pointer);
}

if (n[r]==left)
{
base[p.y][left] = texture;

if (width > 1)
{
base[p.y][left+1] = texture;
}

let pointer ={ x: left, y: p.y };
visitedCount+=1;
stack.push(pointer);
}

if (n[r]==right)
{
base[p.y][right] = texture;

if (width > 1)
{
base[p.y][right-1] = texture;

}

let pointer= { x: right, y: p.y };
visitedCount+=1;
stack.push(pointer);
}

}//can go somewhere
else // go back one step
{
stack.pop();
}

//update values
p={x:stack[stack.length-1].x, y: stack[stack.length-1].y};

up = p.y - 1*width;
down = p.y + 1*width;
left = p.x - 1*width;
right = p.x + 1*width;

};//loop



//fill spaces with walls
for (let i = 0; i < size; i++)
{
for (let u = 0; u < size; u++)
{
if (base[i][u] == 0)
{
base[i][u] = 1;
}
}
}

return base;


};//generate cave

//////////////////////////
//----------------------//
//////////////////////////


//fill the floor with the same tiles
function fillFloor(floor,tile)
{
  
  
  //fill spaces 
for (let i = 0; i < mapSize; i++)
{
for (let u = 0; u < mapSize; u++)
{

if(floor[i][u]==1 || floor[i][u]==10)
{
floor[i][u] = tile;
}

}
}

}
