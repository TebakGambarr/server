var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port =  process.env.PORT || 3000

io.on('connection', function(socket) {
    socket.on('drawing', (data) =>{
        socket.broadcast.emit('drawing',data)
    } )
})

server.listen(port,function(){
    console.log('RUN ON PORT ====>',port)
    });