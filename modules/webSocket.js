'use strict';
const WebSocket = require('ws')
const ws = new WebSocket('wss://wscr.is-a.dev');
const wss = (options, callback) => {

if(typeof callback !== 'function')callback = function callback(err, result) { return err || result; };

if(!options || typeof options !== 'object')throw new Error('Invalid options');

var type = options.type;
var tag =  options.tag;

if(!type)throw new Error('Type is undefined');

ws.onopen = function open() {
  callback(null, 'connected');
  ws.send(`${type}-${tag}`);
};

 ws.onmessage = function incoming(message) {
   var msg = JSON.parse(message.data);
   if(msg.message)return callback('Server Returns An Error', null);
   if(msg.type)throw new Error('Invalid Type');
   callback(null, {type:`ws-${type}`,data:msg}) 
};
}


module.exports = wss
