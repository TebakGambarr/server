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
    console.log('user connected')

    io.emit('getRooms', rooms);

    socket.on('joinRoom', function(room, player){
        let index = rooms.findIndex((obj => obj.name == room.name));
        rooms[index].players.push(player)

        socket.join(room.name);
        io.sockets.in(room.name).emit('connectToRoom', rooms[index]);
    });

    socket.on('recieveMessage', function({ username, room, message }) {
        console.log(2)
        // io.sockets.in(room).emit('publishMessage', { username, message })
        socket.broadcast.to(room).emit('publishMessage', { username, message })
    })

    socket.on('joinArena', function(room){
        let index = rooms.findIndex((obj => obj.name == room.name));
        rooms[index].isPlaying = true;

        io.sockets.in(room.name).emit('connectToArena');
    });

    socket.on('leaveRoom', function(room, username){
        let index = rooms.findIndex((obj => obj.name == room.name));
        let newPlayers = []
        rooms[index].players.forEach(player => {
            if(player !== username) {
                newPlayers.push(player)
            }
        })
        rooms[index].players = newPlayers
        sockets.to(username).emit('backToHome');
    });

    socket.on('disconnect', function(){
        console.log('user disconnected')
    });
})

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});
