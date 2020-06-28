let express = require("express");
let app = express();
let http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 9000;

const io = require("socket.io")(server);

// // const port = 9000;
// app
//   .get("/", (request, response) => {
//     console.log("port number is " + port);
//     response.writeHead(200, { "Content-type": "text/plan" });
//     response.write("hello world!");
//     response.end();
//   })
//   .listen(port);

// server Tip
// join : 채팅방에 대한 이벤트
// message : 기본 메세지 전송에 대한 이벤트

// io.sockets.on("connection", (socket) => {
//   var roomName = null;

//   socket.on("join", (data) => {
//     roomName = data;
//     socket.join(data);
//   });
//   // 특정 방에 있는 클라이언트에게만 메시지 전송

//   socket.on("message", (data) => {
//     io.sockets.in(roomName).emit("message", "data");
//     console.log(data);
//   });
// });

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

server.listen(9000, function () {
  console.log("listening on port 9000");
});

// app
//   .get("/", (request, response) => {
//     console.log("port number is " + port);
//     response.writeHead(200, { "Content-type": "text/plan" });
//     response.write("hello world!");
//     response.end();
//   })
//   .listen(port);
