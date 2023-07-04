const ioClient = require("socket.io-client");
// init env file
require('dotenv').config();
const port = process.env.PORT || 3000;

const user1 = '1';
const socket1 = ioClient(`http://localhost:${port}`, {
    query: `userId=${user1}`
});

const user2 = '2';
const socket2 = ioClient(`http://localhost:${port}`, {
    query: `userId=${user2}`
});

socket2.on('message', (data) => {
    console.log(`Received ${data.message} from ${data.sender}`);
});

setTimeout(() => {
    const sender = '1';
    const receiver = '2';
    const message = 'Test Message';
    // Emit the 'message' event with the sender, receiver, and message parameters
    socket1.emit('message', { sender, receiver, message });
}, 4000);
