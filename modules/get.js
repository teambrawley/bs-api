'use strict';

const axios = require('axios');

const getUrl = (type, string) => {
    if (string === undefined || string === '') {
      throw new TypeError("Please Provide A Tag ")
    } else {
        string = `${string}`;
    }
      if (type === undefined || type === '') {
      throw new TypeError("Type Is Undefined ")
    } else {
if(type.toLowerCase() == "player"){ // players

  type = ``
}else {
if(type.toLowerCase() == "clubs"){ // clubs
 type="clubs/"
}else if(type.toLowerCase() == "rankings/players"){ //rankings/players
  type="rankings/players/"
}else if(type.toLowerCase() == "rankings/clubs"){ // rankings/clubs
  type = "rankings/clubs/"
}else if(type.toLowerCase() == "v1/brawlers"){ // v1/brawlers
  type="v1/brawlers/"
}else if(type.toLowerCase() == "v1/battlelog"){ // v1/battlelog
  type="v1/battlelog/"
}else if(type.toLowerCase == "brawlers"){ // brawlers
  type ="brawlers/"
}else if(type.toLowerCase == "events"){ // brawlers
  type ="v1/events/"
}

else {
  throw new TypeError(type+" Is Not An Option")
}}    }
    let url = `https://cr.is-a.dev/${type}${string}`;
    // console.log(url)
    return url;
};

const getJson = url =>
    new Promise((resolve, reject) => {
        let requestOpts = {
            headers: { 'User-agent': 'bsapi.js' },
        };
        axios.get(url, requestOpts).then(res => {
           if (res.status !== 200) {
              reject(res.status);
            } else {
               resolve(res.data);
            }
        }).catch(err => {
          reject(err);
        })
    });

const get = (type, string) =>
    new Promise((resolve, reject) => {
        let url = getUrl(type, string);
        getJson(url)
            .then(data => {
              const dt = data
                resolve({
                    type: "get-"+type,
                 data: dt, 
                });
            })
            .catch(err => {
                reject(err);
            });
    });


const clubCli = async(option1, option2, Table, chalk) => {
  var table = new Table({
    borders: true
});
  if(!option1)return console.log(chalk`
     Please Provide A Valid Club Tag
  `);
  const club = await getJson(getUrl('clubs', option1));
  if(club){
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
   )
  }
  console.log(table.toString())
}


const playerCli = async(option1, option2, Table, chalk) => {
   if(!option1)return console.log(`
     Please provide a valid player tag
  `)
  try{
var overlay;
var table = new Table({
    borders: true
});
const data = await getJson(getUrl('player', option1));
if(!data.name)return console.log(chalk`
   {red Please Enter A Valid Player Tag}
`)
   switch(option2){
    case "-b":
    case "-brawlers":
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

case "-c":
case "--club":
if(data.club.name){
  const clubTag = data.club.tag;
if(clubTag){
 table.push({ "Player": `${data.name} | ${data.tag}` });
     await clubCli(clubTag.slice(1), '', Table, chalk);
}
}else {
  return console.log(chalk`
     {blue This Player Doesn't Have A Club}
  `)
}

break;

    default:
    overlay = true;
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

console.log(table.toString(), 
`
${overlay ? "Use <option> to view other stats." : ''}
`);
}catch(e){
  console.log(e)
  console.log(`
    Something Went Wrong
  `)

}

}


module.exports = { get, playerCli }
