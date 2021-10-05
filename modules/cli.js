#! /usr/bin/env node
const { spawn } = require('child_process');

const command = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
const option3 = process.argv[5];

const chalk = require('chalk');
const { playerCli, clubCli, eventCli, versionCli } = require('./utils/getStats.js');
const Table = require('./utils/table.js');
const { help, helpProfile, helpClub, helpEvents } = require('./utils/utils.js');

if (!command || command.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid command name.
  Usage: bs <command-name>  

Run bs -h, help to view all available commands and options
`);
}

/*!
 * bsapi.js
 * (c) 2021 Joe Lee
 * Released under the Apache-2.0 License.
 */




(async () => {
switch(command){

  case "-h":
  case "--help":
  case "help":
  switch(option1){
    case "profile":
    helpProfile(chalk);
    break;

    case "club":
    helpClub(chalk);
    break;

    case "event": 
    case "events":
    helpEvents(chalk);
    break;

    default:
    help(chalk);
  }
  break;

  case "-p":
  case "--profile":
  case "profile":
  await playerCli(option1, option2, option3, Table, chalk);
  break;

  case "club":
  case "-c": 
  case "--club":
  await clubCli(option1, option2, option3, Table, chalk);
  break;
  
  case "event":
  case "events":
  await eventCli(option1, option2, option3, Table, chalk);
  break;
   
  case "version":
  case "-v": 
  case "--version":
  await versionCli(option1, option2, option3, Table, chalk);
  break;

  default: console.log(`
      Unknown Command
  `)
}

})();


