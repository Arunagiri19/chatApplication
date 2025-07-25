import io from 'socket.io-client';

const backendURL = import.meta.env.VITE_BACKEND_URL;
export const socket = io(backendURL);
