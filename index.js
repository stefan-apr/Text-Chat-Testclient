const app = require('express')();
const dotenv = require('dotenv');
const http = require('http').Server(app);
const cors = require('cors');

const io = require('socket.io-client');

dotenv.config();

const socket = io.connect('https://text-chat-service.herokuapp.com/', {reconnect: true});
// Below for testing purposes.
// const socket = io.connect('http://localhost:3000', {reconnect: true});

socket.on("connect", () => {
    console.log('Connected to the chat server');
    console.log(socket.id);
    console.log();
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': 'I am sending a test message a player might send. It will be attributed to me as speech.',
    'role': 'Player'
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': '* tests out the chat system using * as an alias for /me. The result is shown as an action of his.',
    'role': 'Player'
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': '/me tests out the chat system using /me instead. The result is shown as an action of his.',
    'role': 'Player'
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': "/as NPC1 I'm testing out the chat system using a command I shouldn't have access to. This will emit an error.",
    'role': 'Player'
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': "/as NPC1 I'm testing out the chat system using a command I now have access to. This will be formatted as a message from the NPC",
    'role': 'GM'
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': "This is what a normal GM message might look like. It sets the scene, and is attributed to no one in particular",
    'role': 'GM'
});

socket.emit('message', {
    'game_id': '5142246',
    'user_name': 'GeeHaus',
    'message': "/test This isn't a real command and will error out",
    'role': 'GM'
});

// Messages are meant to be broadcast to all players at once.
socket.on('message', (msg) => {
    console.log(msg);
    console.log();
});

// Personal messages are meant to be broadcast back only to a specific player. They include the player's user_name in the response.
// TODO: HANDLE THIS ENTIRELY ON THE SERVER SIDE BY KEEPING TRACK OF SOCKET IDS (BROADCAST TO ONLY THAT PLAYER)
socket.on('personalMsg', (obj) => {
    console.log(obj);
    console.log();
});

// Errors are meant to be broadcast back only to a specific player. They include the player's user_name in the response.
// TODO: HANDLE THIS ENTIRELY ON THE SERVER SIDE BY KEEPING TRACK OF SOCKET IDS (BROADCAST TO ONLY THAT PLAYER)
socket.on('err', (err) => {
    console.log(err);
    console.log();
});

http.listen(process.env.PORT || 3002);