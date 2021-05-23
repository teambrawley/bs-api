
'use strict';
const WebSocket = require('ws')
const ws = new WebSocket('wss://wscr.is-a.dev');
const wss = (id) => 
  new Promise((resolve, reject) => {

ws.onopen = function open() {

  console.log('connected');
  ws.send(id);
};

 ws.onmessage = function incoming(message) {
   resolve(JSON.parse(message.data)) 
};
})


module.exports = wss
