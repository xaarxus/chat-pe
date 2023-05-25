import * as http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import { Server, Socket } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routers/users.routes';
import { sessionMiddleware, wrapSession } from './middlewares/session.config';
import authorizeUser from './middlewares/authorizeUser';

dotenv.config();
const app = express();

const corsConfig = {
  origin: process.env.SITE_URL as string,
  credentials: true,
};

const server = http.createServer(app);

const io = new Server({ cors: corsConfig });

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);

app.use('/auth', userRouter);

// app.get('/', (req: any, res: any) => {
//   res.json('hi')
// });

io.use(wrapSession(sessionMiddleware));
io.use(authorizeUser);
io.on('connect', (socket: any) => {
  console.log(socket.request?.session?.user)
});
io.listen(4001);

server.listen(4000, () => {
  console.log('Server started!');
})
