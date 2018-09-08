var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function(req, res, next) { res.send('Hello webRTC!'); });
app.use('/static', express.static('public'))

var server = require('http').createServer(app);
var options = {
    debug: true
}
var peerserver = ExpressPeerServer(server, options);

app.use('/peerjs', peerserver);

server.listen(9000);
