const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", function (_req, res) {
  res.send("socket io");
});

io.on("connection", (socket) => {
  socket.on("room:join", ({ room, user }) => {
    socket.join(room);

    socket.to(room).emit("user:joined", user);

    socket.on("disconnect", () => {
      socket.to(room).emit("user:left", user.name);
    });

    socket.on("user:leave", (name) => {
      if (!user.movieControl) socket.to(room).emit("user:left", { name });
    });

    socket.on("host:mute-user", (userId) => {
      socket.to(room).emit("host:muted-user", userId);
    });

    socket.on("user:toggle-audio", (userId) => {
      socket.to(room).emit("user:toggled-audio", userId);
    });

    socket.on("user:toggle-video", (userId) => {
      socket.to(room).emit("user:toggled-video", userId);
    });

    socket.on("chat:post", ({ username, message }) => {
      socket.to(room).emit("chat:get", { username, message, user });
    });

    socket.on(
      "activity:video:post",
      ({ username, activity, message, video }) => {
        socket
          .to(room)
          .emit("activity:video:get", { username, activity, message, video });

        socket.to(room).emit("chat:get", {
          username,
          message,
          user: {
            name: username,
          },
        });
      },
    );
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
