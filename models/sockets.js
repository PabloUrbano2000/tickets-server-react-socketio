class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // Escuchar el evento
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
        // con io emitimos mensajes en global
        // con server emitimos como en privado
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
