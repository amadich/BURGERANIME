const { Server } = require("socket.io");

const mysocket = (server) => {
  let connectedUsers = 0;
  const users = {}; // Stores the user data by socket ID
  const userSessions = new Set(); // Stores the unique user identifiers (e.g., username or user ID)

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    connectedUsers++;
    console.log(`A user connected. ID: ${socket.id}`);

    io.emit('update_user_count', connectedUsers);

    // Update user list with the current users
    io.emit('update_user_list', Object.values(users));

    socket.on("set_user_data", (userData) => {
      if (!userSessions.has(userData.username)) {
        // User is not already connected, so add them
        userSessions.add(userData.username);
        users[socket.id] = userData;

        // Emit updated user list
        io.emit('update_user_list', Object.values(users));
      } else {
        console.log(`${userData.username} is already connected`);
      }
    });

    socket.on("chat_message", (data) => {
      console.log(`[Message Received] From ${socket.id}: ${data.text}`);
      const message = {
        sender: data.sender,
        text: data.text,
        avatar: data.avatar,
        ranks: data.ranks,
      };

      io.emit("chat_message", message);
      console.log("[Message Broadcasted]", message);
    });

    socket.on("kick_user", (userId) => {
      const userSocketId = Object.keys(users).find(
        (id) => users[id].id === userId
      );
    
      if (userSocketId) {
        // Emit a system message notifying everyone about the kick
        const kickedUser = users[userSocketId];
        const systemMessage = {
          sender: "System",
          text: `${kickedUser.username} has been kicked by the admin.`,
          avatar: "https://burgeranime.vercel.app/assets/logo-af0c912f.png", // You can use a default system avatar or leave it empty
          ranks: {}, // No ranks for system messages
        };
    
        // Broadcast the system message to all users
        io.emit("chat_message", systemMessage);
    
        // Disconnect the kicked user
        io.to(userSocketId).emit("kick_user", userId);
        io.sockets.sockets.get(userSocketId)?.disconnect();
        console.log(`User ${userId} has been kicked`);
      }
    });
    

    socket.on("disconnect", () => {
      connectedUsers--;
      const userData = users[socket.id];
      if (userData) {
        // Remove the user session when they disconnect
        userSessions.delete(userData.username);
        delete users[socket.id];
      }

      io.emit('update_user_count', connectedUsers);
      io.emit('update_user_list', Object.values(users));
      console.log(`A user disconnected. ID: ${socket.id}`);
    });
  });
};

module.exports = { mysocket };
