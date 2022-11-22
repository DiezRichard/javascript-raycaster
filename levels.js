
const Level = function(base, walls2f, floor, roof, doors, switches, sprites,spriteMap,enemies,size,type)
{
this.base=base;
this.floor = floor;
this.roof = roof;
this.doors = doors;
this.sprites = sprites;
this.switches=switches;
this.walls2f=walls2f;
this.enemies=enemies;
this.size=size;
this.spriteMap=spriteMap;
this.type=type;
};


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function generateLevel(size,type,tileSet)
{
  let enemies=[];
  let sprites=[];
  
  let base= generateMap(size);
  let secondFloor = generateMap(size);
  let roof = generateMap2(size, size);
  let doors = generateMap2(size, size);
  let switches = generateMap2(size, size);
  let floor = generateMap2(size, size);
  let spriteMap = generateMap2(size, size);
  
  
  if (type == "desert")
  {
  
  }
  
  if(type=="field")
  {
 
   
  }
  
  if (type == "dungeon")
  {
    floor = generateCave(size,tileSet[1]);
    base = generateMazeWalls(size,floor,tileSet[0]);
    fillFloor(floor,tileSet[1]);
    
    roof = floor;
  }
  
  if (type == "maze")
  {
    
    floor = generateMaze(size,tileSet[1]);
    base = generateMazeWalls(size,floor,tileSet[0]);
fillFloor(floor,tileSet[1]);
    roof = floor;
  }
  
  if (type == "cave")
  {
    floor= generateCave(size,tileSet[1]);
    base= generateMazeWalls(size,floor,tileSet[0]);
  fillFloor(floor,tileSet[1]);
    roof = floor;
  }
  
  if (type == "tomb")
  {

    floor = generateCave(size,tileSet[1]);
    base = generateMazeWalls(size,floor,tileSet[0]);
 fillFloor(floor,tileSet[1]);
    roof = floor;
  }
  
  
let level = new Level(base,secondFloor, floor, roof, doors, switches, sprites,spriteMap,enemies,size,type);
  

//----------------------//

//ADD BUILDINGS AND SPRITES
if(level.type=="field" || level.type=="desert")
{


//add entrance 
let n=randomNumber(3);

for(let i=0;i<n;i++)
{
  addBuildings2(level);
}

//----------------------//

n = randomNumber(10) + 5;


//add N buildings
for (let i = 0; i < n; i++)
{
  addBuildings(level);
  generateSwitch(level);
};

//----------------------//

//load static sprites 
addSprites(level);

};//add buildings and sprites

//----------------------//

//ADD ENEMIES
//load enemies array
addEnemies(level);

//----------------------//

//ADD PORTALS
addPortals(level);

//----------------------//

  return level;
  
}// generate level

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


//Create enemies randomly
function addEnemies(level)
{

let n=25;

let numberOfEnemies= randomNumber(n)+n;

let e=harubus1;


for(let i=0;i<numberOfEnemies;i++)
{
let posX = randomNumber(level.size-6)+5;
let posY = randomNumber(level.size-6)+5;

if(level.base[posY][posX]==0 && level.doors[posY][posX]==0 )
{ 


let enemy= new Sprite(posX*tileSize+16,posY*tileSize+16,e.t,e.w,e.h);

enemy.type="enemy";
enemy.name=e.name;
enemy.shadow=e.shadow;
//enemy.shadow=invaderShadow;
level.enemies.push(enemy);
}; 
}//i loop
}//addEnemies

/////////////////////////////////
//-----------------------------//
/////////////////////////////////


//Create sprites randomly
function addSprites(level)
{

let numberOfSprites =50;// randomNumber(100)+250;

let s=tree1;

for (let i = 0; i < numberOfSprites; i++)
{
let posX =randomNumber(level.size - 4) + 3;

let posY =randomNumber(level.size - 4) + 3;

if(level.base[posY][posX]==0 && level.doors[posY][posX]==0 && level.roof[posY][posX]==0&& level.spriteMap[posY][posX]==0)
{

let h=100;
let w=100;



let sprite = new Sprite(posX * tileSize + 16, posY * tileSize + 16, s.t, w, h);

sprite.type="plant";
sprite.shadow=s.shadow;
level.sprites.push(sprite);
level.spriteMap[posY][posX]=1;


};
} //i loop



} //addSprites


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function addPortals(level)
{

if(level.type!="field")
{
  level.switches[1][1]=-3;
}
 
  
  for(let i=0;i<mapSize;i++)
{
  for(let u=0;u<mapSize;u++)
  {

if(level.switches[i][u]<0)
{
  let sprite = new Sprite(u * tileSize+16, i * tileSize+16, portal1, 246, 486);

sprite.type="portal";
level.sprites.push(sprite);
level.spriteMap[i][u]=1;


}//if switches
}//u
}//i



};

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function addBuildings(level)
{
let n=4;
let step=6;
let l=level;
let tileSet=tileSetGenerator();

let rndPosX= randomNumber(n)*step;

let rndPosY= randomNumber(n)*step;


let b= generateBuilding();

// copy B
let newB=[];
for(let i=0;i<b.length;i++)
{
let inner=[]
for(let u=0;u<b[0].length;u++)
{
inner.push(b[i][u]);
}
newB.push(inner);
}

let bset=generateDoors(b);
let building=bset[0];
let doors=bset[1];

//avoid overlapping
if(level.base[rndPosY][rndPosX]==0)
{

for(let y=0; y< building.length;y++)
{
for(let x=0;x<building[0].length;x++)
{
//walls
if(building[y][x]>0)
{
 level.base[rndPosY+y][rndPosX+x]=tileSet[0];//building[y][x];
}
 
 //doors
 level.doors[rndPosY+y][rndPosX+x]=doors[y][x];
 
 //second floor walls
 level.walls2f[rndPosY+y][rndPosX+x]=tileSet[0];//newB[y][x];

 //floor
 level.floor[rndPosY+y][rndPosX+x]=tileSet[1];//b[0][0];
 
 //roof
 level.roof[rndPosY+y][rndPosX+x]=tileSet[2];//b[0][0];
 
 
}//x
}//y
}//if there's no other building 


}//add buildings

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//add cave or tomb or dungeon entrance
function addBuildings2(level)
{
let n=4;
let step=6;
let l=level;

let rnd=randomNumber(3);
let texture=4;
let type="";
let tileSet=tileSetGenerator();
//cave 
if(rnd==0)
{
 
  type="cave";
};

//dungeon
if(rnd==1)
{
 
  type="dungeon";
};

//maze 
if (rnd == 2)
{
 
  type = "maze";
};

//tomb
if (rnd == 3)
{
  
  type = "tomb";
};


let rndPosX= randomNumber(n)*step;

let rndPosY= randomNumber(n)*step;


let b=generateEntrance();

// copy B
let newB=[];
for(let i=0;i<b.length;i++)
{
let inner=[]
for(let u=0;u<b[0].length;u++)
{
inner.push(b[i][u]);
}
newB.push(inner);
}

let bset=generatePortal(b, rnd);
let building=bset[0];
let doors=bset[1];
let switches=bset[2];
//let tileSet= tileSetGenerator();

//avoid overlapping
if(level.base[rndPosY][rndPosX]==0)
{

for(let y=0; y< building.length;y++)
{
for(let x=0;x<building[0].length;x++)
{
//walls
if(building[y][x]>0)
{
 level.base[rndPosY+y][rndPosX+x]=tileSet[0];//building[y][x];
 
 //center black
 level.base[rndPosY+1][rndPosX+1]=99;
}

 //portal door
 //level.doors[rndPosY+y][rndPosX+x]=doors[y][x];
 
 //portal switch
  level.switches[rndPosY+y][rndPosX+x]=switches[y][x];
 
 //second floor walls
 //level.walls2f[rndPosY+y][rndPosX+x]=texture;//tileSet[0];//newB[y][x];

 //floor
 //level.floor[rndPosY+y][rndPosX+x]=tileSet[1];//b[0][0];
 
 //roof
 //level.roof[rndPosY+y][rndPosX+x]=texture;//tileSet[2];//b[0][0];



}//x
}//y

//creates the level asociated to this entrance, portal and coords used here.
let lev=generateLevel(mapSize, type, tileSet);
let xii= rndPosX+bset[3];
let yii=rndPosY+bset[4];
//vector level with coords of portal to asociate it.
let vlevel = {level:lev,px:xii,py:yii};

lvlList.push(vlevel);

}//if there's no other building 


}//add buildings2


/////////////////////////////////
//-----------------------------//
/////////////////////////////////


//tile set generator for buildings
//walls - floor - roof
function tileSetGenerator()
{
  let tileSet=[];
  
  let rnd= randomNumber(4);
  
  switch(rnd)
  {
    //maybe it happens
    case 0: tileSet[0]=4;
            tileSet[1]=2;
            tileSet[2]=4;
            break;
            
    case 1: tileSet[0]=5;
            tileSet[1]=2;
            tileSet[2]=5;
            break;
            
    case 2: tileSet[0] = 6;
            tileSet[1] = 2;
            tileSet[2] = 6;
            break;
    
    case 3: tileSet[0] = 7;
            tileSet[1] = 2;
            tileSet[2] = 7;
            break;
            
    case 4: tileSet[0] = 9;
            tileSet[1] = 2;
            tileSet[2] = 9;
    break;
  };
  
  return tileSet;
};


/////////////////////////////////
//-----------------------------//
/////////////////////////////////

function tileSelector(n)
{
  let tile;
  switch(n)
  {
    case 0:
    
    if(level.type=="field")
    {
      tile=grass;
    }
    
    if (level.type == "desert")
    {
      tile = dirt;
    }
    
    break;
    
    case 1: tile=grass; break;
    case 2: tile=dirt; break;
    case 3: tile=water; break;
    case 4: tile=caveWall; break;
    case 5: tile=woodPlank; break;
    case 6: tile=stoneWall; break;
    case 7: tile=stoneDark; break;
    case 8: tile=brickWall; break;
    case 9: tile=groundStone; break;
    case 10: tile=fence; break;
    case 99: tile=black;
    
      break;
  }
  
  return tile;
}//tileSelector

/////////////////////////////////
//-----------------------------//
/////////////////////////////////

//select tile depending on level type
function tileSelectorByType(type)
{
  let tile;
  switch(type)
  {
    case "cave": tile=caveWall;break;
    case "dungeon": tile=stoneWall;break;
    case "maze": tile=woodPlank;break;
case "tomb": tile=stoneDark;break;
  }
  return tile;
}

/////////////////////////////////
//-----------------------------//
/////////////////////////////////
