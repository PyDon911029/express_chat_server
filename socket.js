module.exports = function (server) {

    const connectedUsers = [];
    const io = require('socket.io')(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log('socket connected');
        const userId = socket.handshake.query.userId;
        console.log(`New User ${userId} is connected!`);
        connectedUsers.push({
            socket: socket.id,
            user: userId
        });

        socket.on("disconnect", () => {
            const index = connectedUsers.findIndex((user) => user.socket === socket.id);
            if (index !== -1) {
                connectedUsers.splice(index, 1);
            }
        });

        socket.on("message", (data) => {
            const { sender, receiver, message } = data;
            console.log("Sender:", sender);
            console.log("Receiver:", receiver);
            console.log("Message:", message);

            // Find the socket of the receiver
            const receiverSocket = connectedUsers.find((user) => user.user === receiver)?.socket;

            if (receiverSocket) {
                // Send the message to the receiver
                io.to(receiverSocket).emit("message", { sender, message });
            } else {
                console.log("Receiver not found!");
                // Handle the case when the receiver is not found
            }
        });
    });
};
