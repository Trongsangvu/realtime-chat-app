import { PeerServer } from "peer";

const port = Number(process.env.PORT) || 9000;

PeerServer({ port, path: "/" });
