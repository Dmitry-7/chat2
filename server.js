var express = require('express');
var http = require('http');
var WebSocket =require('ws');
var bodyParser = require('body-parser');
var app = express();
var chatMessages = [];

var server  = http.createServer(app).listen(3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res){
    res.send('Ошибка 404', 404);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Ошибка 500',500);
});

var webSocketServer = new WebSocket.Server({server:server});
webSocketServer.on('connection',function(ws){
    //ws.send('message from server');
    ws.on('message' ,function(message){
        chatMessages.push(JSON.parse(message));
        //console.log(JSON.stringify(chatMessages));
    })
    var sendDelay = setInterval(function(){
        if(chatMessages.length>0){
            webSocketServer.clients.forEach(client => {
                client.send(JSON.stringify(chatMessages));
                
            });
            chatMessages=[]; 
        }
    },100);
});




