// external dependencies
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const { readdirSync } = require("fs");
const { ExpressPeerServer } = require('peer')
const SocketServer = require('./socketServer')

// defining app instance
const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// counting every env file from root file
const { PORT, DB } = require("./env");

const server = require('http').createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://dgteam.vercel.app",
      "https://team-client.vercel.app/",
    ],
  },
});

io.on('connection', (socket) => {
  SocketServer(socket)
});

// Create peer server
ExpressPeerServer(server, { path: '/' })

const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// listening all routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// database and port connetion
mongoose
  .connect(DB)
  .then(() =>
    server.listen(PORT, () => {
      console.log(
        `Database connected and Server running: http://localhost:${PORT}`
      );
    })
  )
  .catch((err) => console.log(err));
