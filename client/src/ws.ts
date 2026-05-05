import socketIOClient from "socket.io-client";

export const WS =  process.env.REACT_APP_WS_URL || "http://localhost:8080"; 
export const ws = socketIOClient(WS);
