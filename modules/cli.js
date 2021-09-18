const { spawn } = require('child_process');

const command = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const option3 = process.argv[5];

const chalk = require('chalk');
const getStats = require('./get.js');
const Table = require('./table/index.js');

if (!command || command.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid command name.
  Usage: bs <command-name>  

Run bs -h, help to view all available commands and options
`);
}


const help = () => {
  console.log(`
        bsapi.js - Interact with bs-api using cli.

        Usage: 
         bs <command> <option1>

       Options: 
         -h, --help     List of available commands & options
         -c, --club     Get a club's in-game stats
         -e, --events   Events Rotation
         -b, --brawlers Get a player's in-game brawlers stats
         -m, --members  Get club members stats
         -e, --export   Export a data

        Commands: 
         help       Help Command
         profile    Get a player's in-game stats
         club       Get a club's in-game stats
         events     Get Events Rotation Datas

        Links:
         Github Repository : https://github.com/emzjs/emz
      `)
}

(async () => {
switch(command){

  case "-h":
  case "--help":
  case "help":
  help();
  break;

  case "-p":
  case "--profile":
  case "profile":
  await getStats.playerCli(option1, option2, Table, chalk);
  break;

  

  default: console.log(`
      Unknown Command
  `)
}

})();

