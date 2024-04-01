import { Server } from "socket.io";
import { NextRequest, NextResponse } from "next";

const revalidate = 0;

const SocketHandler = (req, res) => {
  console.log("res", res);
  if (res.socket?.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      path: "/api/socket_io",
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
    console.log("res", res);

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
      });
    });
  }
  res.end();
};

// export default SocketHandler;
export { SocketHandler as GET, SocketHandler as POST };
