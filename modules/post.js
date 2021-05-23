'use strict';

const request = require('request');

const getUrl = (type, string) => {
    if (string === undefined || string === '') {
      throw new TypeError("Please Provide A Tag")
    } else {
        string = `${string}`;
    }
      if (type === undefined || type === '') {
      throw new TypeError("Type Is Undefined")
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
}else if(type.toLowerCase == "v1/brawlers"){ // v1/brawlers
  type="v1/brawlers/"
}else if(type.toLowerCase() == "v1/battlelog"){ // v1/battlelog
  type="v1/battlelog/"
}else if(type.toLowerCase == "brawlers"){ // brawlers
  type ="brawlers/"
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
            url: url,
            json: true,
            headers: { 'User-agent': 'request' },
        };

        request.post(requestOpts, (err, res, data) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== 200) {
                reject(res.statusCode);
            } else {
                resolve(data);
            }
        });
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

module.exports = get
