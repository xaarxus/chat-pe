import * as http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import userRouter from './routers/users.routes';

dotenv.config();
const app = express();

const server = http.createServer(app);

const io = new Server({
  cors: {
    origin: process.env.SITE_URL as string,
    credentials: true,
  },
});

app.use(helmet());
app.use(cors({
  origin: process.env.SITE_URL as string,
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.COOKIE_SECRET as string,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: 'auto',
    httpOnly: true,
    sameSite: process.env.ENVIRONMANT === 'production' ? 'none' : 'lax',
    expires: new Date((new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)),
  },
}));

app.use('/auth', userRouter);

// app.get('/', (req: any, res: any) => {
//   res.json('hi')
// });

io.on('connect', socket => {});

server.listen(4000, () => {
  console.log('Server started!');
})
