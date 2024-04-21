const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8765");


ws.on('open', function open() {
  console.log('Connected to Python server');
});


module.exports = {ws,onMessage:(callback)=>ws.on("message",callback)};
