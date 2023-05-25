import dotenv from 'dotenv';
import session from 'express-session';
import { Socket } from 'socket.io';

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET as string,
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: 'auto',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    expires: new Date((new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)),
  },
});

const wrapSession = (expressMiddleware: (req: any, res: any, next: any) => void) => (socket: Socket, next: (err?: any) => void) => {
  expressMiddleware(socket.request, {}, next);
};

export {
  sessionMiddleware,
  wrapSession,
};
