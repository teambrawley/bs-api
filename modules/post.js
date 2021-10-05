/*!
 * bsapi.js
 * (c) 2021 Joe Lee
 * Released under the Apache-2.0 License.
 */
'use strict';

const { postJson, getUrl } = require('./utils/utils.js');


const post = (type, string) =>
    new Promise((resolve, reject) => {
        let url = getUrl(type, string);
        postJson(url)
            .then(data => {
              if(data.message)throw new Error(`Server Returns An Error, "${data.message}"`)
              const dt = data
                resolve({
                    type: "post-"+type,
                 data: dt, 
                });
            })
            .catch(err => {
                reject(err);
            });
    });

module.exports = post
