var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const rooms = [
    {
        name: 'room1',
        players: [],
        isPlaying: false
    },
    {
        name: 'room2',
        players: [],
        isPlaying: false
    }
];

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var roomno = 1;
io.on('connection', function(socket) {

    io.emit('getRooms', rooms);

    socket.on('joinRoom', function(room, player){
        let index = rooms.findIndex((obj => obj.name == room.name));
        rooms[index].players.push(player)

        socket.join(room.name);
        io.sockets.in(room.name).emit('connectToRoom', rooms[index]);
    });
})

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});