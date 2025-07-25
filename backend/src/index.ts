import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { socketHandler } from './sockets/socketHandler';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

socketHandler(io);
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
