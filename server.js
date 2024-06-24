// https://www.piesocket.com/socketio-tester <---WEBSITE TO TEST EMITS

import db from "./db/mongo.js";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import routes from "./routes/index.js";
// import socketServer from "./socketServer.js";
// import ioMiddleware from "./middleware/ioMIddleware.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

// Allow requests from any origin
const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(logger("dev"));

// // Initialize Socket.IO server
// const io = new socketServer(server, {
//   cors: corsOptions,
// });

// Use socket in all routes
// app.use(ioMiddleware(io));

app.use("/api", routes);

db.on("connected", () => {
  console.clear();
  console.log("Connected to MongoDB");
  server.listen(PORT, () => {
    console.log(`Express server running on PORT: ${PORT}`);
  });
});
