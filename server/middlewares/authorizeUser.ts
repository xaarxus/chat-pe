import redisClient from '../redis';

const authorizeUser = (socket: any, next: (err?: any) => void) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log('Bad request')
    next(new Error('Not authorized'));
  } else {
    socket.user = { ...socket.request.session.user };
    console.log(socket.user)
    redisClient.hset(
      `userid:${socket.user.username}`,
      'userid',
      socket.user.userid,
    );
    next();
  }
};

export default authorizeUser;