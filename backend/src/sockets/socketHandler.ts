import { Server, Socket } from 'socket.io';

export const socketHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', (msg) => {
      socket.broadcast.emit('receiveMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};