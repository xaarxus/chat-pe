import redisClient from '../redis';


const authorizeUser = (socket: any, next: (err?: any) => void) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log('Bad request')
    next(new Error('Not authorized'));
  } else {
    next();
  }
};



const initializeUser = async (socket: any) => {
  socket.user = { ...socket.request.session.user };
  await redisClient.hset(
    `userid:${socket.user.username}`,
    'userid',
    socket.user.userid,
  );

  const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  setTimeout(() => socket.emit('friends', friendList), 100);

  console.log('userid', socket.user.userid, ' | username', socket.user.username)
};



const addFriend = async (socket: any, friendName: string, cb: any) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" });
    return;
  }

  const friendUserId = await redisClient.hget(`userid:${friendName}`, 'userid');
  if (!friendUserId) {
    cb({ done: false, errorMsg: "User doesn't exist!" });
    return;
  }

  const currentFriendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  if (currentFriendList && (currentFriendList.indexOf(friendName) !== -1)) {
    cb({ done: false, errorMsg: "Friend already added!" });
    return;
  }

  await redisClient.lpush(`friends:${socket.user.username}`, friendName);
  cb({ done: true, newFriend: friendName });
  return;
};

export {
  authorizeUser,
  initializeUser,
  addFriend,
};