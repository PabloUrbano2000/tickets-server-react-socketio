// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;

    // Http server
    this.server = http.createServer(this.app);

    // Configuración del server
    this.io = socketio(this.server, {});

    // Inicializar sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // Get de los últimos tickets
    this.app.get("/ultimos", (req, res) => {
      res.json({
        ok: true,
        ultimos: this.sockets.ticketList.ultimos13,
      });
    });
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("server corriendo:", this.port);
    });
  }
}

module.exports = Server;
