

//----------------------//



function randomNumber(l)
{
let rnd =Math.floor(Math.random()*(l+1));

return rnd;
}

//----------------------//

function cloneLevel(level)
{
let newLevel;

let newBase = cloneArray(level.base);
let newFloor = cloneArray(level.floor);
let new2f = cloneArray(level.walls2f);
let newRoof = cloneArray(level.roof);
let newDoors = cloneArray(level.doors);
let newSwitches = cloneArray(level.switches);
let newSpriteMap = cloneArray(level.spriteMap);
let newSprites= cloneList(level.sprites);
let newEnemies= cloneList(level.enemies);


newLevel = new Level(newBase,new2f,newFloor,newRoof,newDoors,newSwitches,newSprites,newSpriteMap,newEnemies,level.size,level.type);


return newLevel;
}

//----------------------//

function cloneArray(arr)
{
  let newArr=[];
  
  for(let i=0;i<arr.length;i++)
  {
    let inner=[];
    
    for(let u=0;u<arr.length;u++)
    {
      inner.push(arr[i][u]);
    }
    newArr.push(inner);
  }
  
  return newArr;
};

//----------------------//

function cloneList(list)
{
  let newList=[];
  
  for(e of list)
  {
    newList.push(e);
  }
  
  return newList;
}
