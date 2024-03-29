const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket is active and connected.");

  socket.on("chat", (payload) => {
    console.log(`Received message: ${JSON.stringify(payload)}`);
    io.emit("chat", payload);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected.");
  });
});

server.listen(8000, () => {
  console.log(`Server is active on port 8000...`);
});
