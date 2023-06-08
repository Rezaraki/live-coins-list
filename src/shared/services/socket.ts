import { io } from "socket.io-client";

const URL = "wss://fstream.binance.com/ws/ticker@arr";

export const socket = io(URL);
