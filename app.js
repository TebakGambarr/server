var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let currentRoom = {}
let currentPlayer = {}

const rooms = [
    {
        name: 'room1',
        players: [],
        password: null,
        isPlaying: false
    },
    {
        name: 'room2',
        players: [],
        password: null,
        isPlaying: false
    }
];

const words = ['mouth', 'eyes', 'house', 'shoes', 'cat', 'dog', 'house', 'cow'];

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log('user connected')

    io.emit('getRooms', rooms);

    socket.on('joinRoom', function(room, player){
        let index = rooms.findIndex((obj => obj.name == room.name));
        rooms[index].players.push(player)

        currentRoom = room;
        currentPlayer = player;

        socket.join(room.name);
        io.sockets.in(room.name).emit('connectToRoom', rooms[index]);
    });

    socket.on('createRoom', function(room, player) {
        let newRoom = {
            name: room.name,
            players: [player],
            password: room.password || null,
            isPlaying: false
        }
        rooms.push(newRoom);

        currentRoom = newRoom;
        currentPlayer = player;

        socket.join(newRoom.name);
        io.sockets.in(newRoom.name).emit('connectToNewRoom', newRoom);
    })

    socket.on('receiveMessage', function({ username, room, message }) {
        io.in(room.name).emit('publishMessage',  { username, message });
    })

    socket.on('joinArena', function(room){
        let index = rooms.findIndex((obj => obj.name == room.name));
        rooms[index].isPlaying = true;

        var rand = words[Math.floor(Math.random() * words.length)];

        io.in(room.name).emit('connectToArena', rand);
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

    socket.on('drawing', (data) =>{
        socket.broadcast.emit('drawing',data)
    })

    socket.on('disconnect', function(){
        if (currentRoom && currentPlayer) {
            let index = rooms.findIndex((obj => obj.name == currentRoom.name));
            let room = rooms[index];
            let filtered = room.players.filter(function(e) { return e !== currentPlayer })
            rooms[index].players = filtered;
            currentRoom = null;
            currentPlayer = null;
        }
    });
})

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});