const { Server } = require("socket.io");

const mysocket = (server) => {
    
   // user connected
   let connectedUsers = 0;
   // io is the server instance , it will listen to the server
   const io = new Server(server, {
      cors: {
         origin: process.env.CLIENT_URL,
         methods: ['GET', 'POST'],
      },
   });

   // start listening to the connection event
   // when a user connects , the callback function will be called
   // the callback function will receive the socket instance of the user

   io.on("connection", (socket) => {
      connectedUsers++;
      io.emit('update_user_count', connectedUsers);
      console.log('A user connected, ID:', socket.id);
      
      // disconnect event will be emitted when a user disconnects
      socket.on("disconnect", () => {
         connectedUsers--;
         io.emit('update_user_count', connectedUsers);
         console.log('A user disconnected, ID:', socket.id);
      });
   });
}

module.exports = { mysocket };