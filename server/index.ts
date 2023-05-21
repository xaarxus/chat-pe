import * as http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';
import helmet from 'helmet';

dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server({
  cors: {
    origin: process.env.ORIGIN_URL as string,
    credentials: true,
  },
});

app.use(helmet());
app.use(express.json());

app.get('/', (req: any, res: any) => {
  res.json('hi')
});

io.on('connect', socket => {});

server.listen(4000, () => {
  console.log('Server started!');
})
