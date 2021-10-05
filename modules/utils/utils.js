/*!
 * bsapi.js/utils
 * (c) 2021 Joe Lee
 * Released under the Apache-2.0 License.
 */

const axios = require('axios');

exports.repeat = function (str, times) {
  return Array(times + 1).join(str)
}

exports.truncate = function (str, length, chr) {
  chr = chr || '…'
  return str.length >= length ? str.substr(0, length - chr.length) + chr : str
}

exports.help = (chalk) => {
  console.log(`
        bsapi.js - Interact with bs-api using cli.

        Usage: 
         bs <command> <option1>

       Options: 
         -c, --club     Get a club's in-game stats
         -b, --brawlers Get a player's in-game brawlers stats
         -m, --members  Get club members stats
         -e, --export   Export a data

        Commands: 
         help       Help Command
         profile    Get a player's in-game stats
         club       Get a club's in-game stats
         events     Get Events Rotation Datas

        Links:
         Github Repository : https://github.com/brawlie/bs-api
      `)
}

exports.helpProfile = (chalk) => {
   console.log(chalk`
  bsapi.js - Interact with api-bs using cli.

   Usage:
    bs profile <#TAG> [option1]

   Options:
    -c, --club     Get a player's in-game club stats
    -b, --brawlers Get a player's in-game brawlers stats
    -e, --export   Export a player's in-game stats

   Export Usage:
    bs profile <#TAG> -e <file/directory>
   `)
}

exports.helpClub = (chalk) => {
   console.log(chalk`
  bsapi.js - Interact with api-bs using cli.

   Usage:
    bs club <#TAG> [option1]

   Options:
    -m, --members  Get every club member's in-game stats
    -e, --export   Export a player's in-game stats

   Export Usage:
    bs club <#TAG> -e <file/directory>
   `)
}

exports.helpEvents = (chalk) => {
   console.log(chalk`
  bsapi.js - Interact with api-bs using cli.

   Usage:
    bs events [option1]

   Options:
    -e, --export  Export event rotation data

   Export Usage:
    bs events -e <file/directory>
   
  `)
}

exports.getJson = (url) =>
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

exports.postJson = (url) =>
    new Promise((resolve, reject) => {
       let requestOpts = {
            headers: { 'User-agent': 'bsapi.js' },
        };
        axios.post(url, requestOpts).then(res => {
           if (res.status !== 200) {
              reject(res.status);
            } else {
               resolve(res.data);
            }
        }).catch(err => {
          reject(err);
        })
    });

function options (defaults, opts) {
  for (var p in opts) {
    if (opts[p] && opts[p].constructor && opts[p].constructor === Object) {
      defaults[p] = defaults[p] || {}
      options(defaults[p], opts[p])
    } else {
      defaults[p] = opts[p]
    }
  }

  return defaults
};
exports.options = options;
exports.axios = axios;

exports.strlen = function (str) {
  var code = /\u001b\[(?:\d*;){0,5}\d*m/g
  var stripped = ('' + (str != null ? str : '')).replace(code, '')
  var split = stripped.split('\n')
  return split.reduce(function (memo, s) { return (s.length > memo) ? s.length : memo }, 0)
}

exports.regexp = (string) => {
  if(string.length < 6)return false;
  // RegExp Scheme Provided By 1998CR
  var patt =  new RegExp(/(#)[0289CGJLPOQRUVY]{3,}/gmi);
  var result = patt.test(string);
  return result;
}

exports.getUrl = (type, s) => {
var string = s;
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
}else if(type.toLowerCase() == "brawlers"){ // brawlers
  type ="brawlers/";
  string = '';
}else if(type.toLowerCase() == "events"){ // brawlers
  type ="v1/events";
  string = '';
}else if(type.toLowerCase() == "v1/clublog"){
  type = "v1/clublog/";
}

else {
  throw new TypeError(type+" Is Not An Option")
}}   
    if (string === undefined) {
      throw new TypeError("Please Provide A Tag ")
    } else {
        string = `${string}`;
    }
 }

    let url = `https://cr.is-a.dev/${type}${string}`;
    // console.log(url)
    return url;
};
