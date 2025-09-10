import { io } from "socket.io-client";

const URL = "http://localhost:3000"; // adjust to your backend URL/port
export const socket = io(URL);
