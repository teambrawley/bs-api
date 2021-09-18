const get = require('./../get.js');
const fs = require('fs');

const clubCli = async(option1, option2, option3, Table, chalk) => {
  var table = new Table({
    borders: true
});
var displayTable;
  if(!option1)return console.log(chalk`
     Please Provide A Valid Club Tag
  `);
  const club = (await get('clubs', option1)).data;
  if(club){
   switch(option2){
   
   case "--members":
   case "-m":
   displayTable = true;
   if(club.members){
     club.members.forEach((x) => {
       table.push({
         [(chalk`
{yellow ${x.name} 
${x.tag}}`)]: (chalk`
    {green Trophies} : ${x.trophies}
    ${x.role ? (chalk`{blue Role} : ${x.role}`) : ''}
         `)
       })
     })
   }
   break;

  case "-e": 
  case "--export":
  case "export": 
 if(!option3)return console.log(chalk`
     {red Please Provide A Directory}
 `);
  console.log(chalk`
    {green Success, ${fs.existsSync(`${option3}.json`) ? 'Overwrote' : 'Created'} {underline ${option3}}}
  `)
  fs.writeFileSync(`${option3}.json`, JSON.stringify(data))

  break;


  default: 
  displayTable = true;
  table.push(
   { [(chalk`{green Club Name}`)]: club.name },
   { [(chalk`{green Club Tag}`)]: club.tag },
   { [(chalk`{green Type}`)]: club.type },
   { [(chalk`{green Required Trophies}`)]: club.requiredTrophies },
   { [(chalk`{green Total Trophies}`)]: club.trophies },
   { [(chalk`{green Members}`)]: club.members ? club.members.length : 0 },
   { [(chalk`{green Club Tag}`)]: club.tag },
   { [(chalk`{green President}`)]: club.president[0] ?  `${club.president[0].name} | ${club.president[0].tag}` : 'No President'},
   { [(chalk`{green Members Count}`)]: club.count.member ? club.count.member : 0},
   { [(chalk`{green Vice President Count}`)]: club.count.vice ? club.count.vice : 0},   
   { [(chalk`{green Senior Count}`)]: club.count.senior ? club.count.senior : 0},
   );
   }
  }
  if(displayTable){
  console.log(table.toString());
  }
}


const playerCli = async(option1, option2, option3, Table, chalk) => {
  var displayTable;
   if(!option1)return console.log(`
     Please provide a valid player tag
  `)
  try{
var overlay;
var table = new Table({
    borders: true
});
const data = (await get('player', option1)).data;
if(!data.name)return console.log(chalk`
   {red Please Enter A Valid Player Tag}
`)
   switch(option2){
    case "-b":
    case "-brawlers":
    displayTable = true;
    if(data.brawlers){
      overlay = true;
      table.push({ 'Player': `${data.name} | ${data.tag}`});
      data.brawlers.forEach((x, y) => {
        table.push({ [`${x.name}`]: (chalk`
  {blue Level} : ${x.power}
  {magenta Rank} : ${x.rank}
  {yellow Trophies} : ${x.trophies}
  {green Highest Trophies} : ${x.highestTrophies}
        `)})
      })
    }
    break;

  case "-e": 
  case "--export":
  case "export": 
 if(!option3)return console.log(chalk`
     {red Please Provide A Directory}
 `);
  console.log(chalk`
    {green Success, ${fs.existsSync(`${option3}.json`) ? 'Overwrote' : 'Created'} {underline ${option3}}}
  `)
  fs.writeFileSync(`${option3}.json`, JSON.stringify(data))

  break;

case "-c":
case "--club":
displayTable = true;
if(data.club.name){
  const clubTag = data.club.tag;
if(clubTag){
 table.push({ "Player": `${data.name} | ${data.tag}` });
     await clubCli(clubTag.slice(1), '', '', Table, chalk);
}
}else {
  return console.log(chalk`
     {blue This Player Doesn't Have A Club}
  `)
}

break;

    default:
    overlay = true;
    displayTable = true;
   table.push(
    { 'Player Name': data.name },
    { 'Player Tag': data.tag },
    { 'Total Trophies' : data.trophies },
    { 'Highest Trophies': data.highestTrophies },
    { 'Exp Level/Points': `Lvl: ${data.expLevel} | ${data.expPoints}` },
    { '3v3 Victories' : data['3vs3Victories'] },
    { 'Solo Victories' : data.soloVictories },
    { 'Duo Victories' : data.duoVictories },
    { 'Club Name/Tag' : `${data.club ? data.club.name : 'Not In A Club'} | ${data.club ? data.club.tag : ''}` },
    { 'Total Brawlers' : data.brawlers? data.brawlers.length : 0 }
);

   }
if(displayTable){
console.log(table.toString(), 
`${overlay ? `
Use <option> to view other stats.` : ''}
`);
}
}catch(e){
  console.log(e)
  console.log(`
    Something Went Wrong
  `)

}

}


const eventCli = async(option1, option2, option3, Table, chalk) => {
  var displayTable;
  const data = (await get('events')).data;
  const table = new Table({
    borders: true,
    head: ['Current Events']
  })
  switch(option1){
    case "-e":
    case "--export":
if(!option2)return console.log(chalk`
     {red Please Provide A Directory}
 `);
  console.log(chalk`
    {green Success, ${fs.existsSync(`${option2}.json`) ? 'Overwrote' : 'Created'} {underline ${option2}}}
  `)
  fs.writeFileSync(`${option2}.json`, JSON.stringify(data))
    break;

    default:
    displayTable = true;
  if(data){
    data.events.forEach((x) => {
     table.push([(chalk`
  {green ${x.name}}

  {red Ends} : ${x.ends}
  {blue Type} : ${x.type}
     `)]);
    })
  }
  }
  if(displayTable){
  console.log(table.toString())
  }
}

module.exports = { playerCli, clubCli, eventCli };
