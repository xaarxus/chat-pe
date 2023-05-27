import redisClient from '../redis';


type Friend = {
  username: string,
  userid: string,
  connected: boolean,
};


const parseFriendList = async (friendList: any) => {
  const newFriendList = [] as Friend[];
  for (let friend of friendList) {
    const parsedFriend = friend.split('.');
    const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, 'connected');
    newFriendList.push({
      username: parsedFriend[0],
      userid: parsedFriend[1],
      connected: friendConnected === 'true' ? true : false,
    });
  }
  return newFriendList;
};


const authorizeUser = (socket: any, next: (err?: any) => void) => {
  if (!socket.request.session || !socket.request.session.user) {
    next(new Error('Not authorized'));
  } else {
    next();
  }
};


const initializeUser = async (socket: any) => {
  socket.user = { ...socket.request.session.user };
  socket.join(socket.user.userid);

  await redisClient.hset(
    `userid:${socket.user.username}`,
    'userid',
    socket.user.userid,
    'connected',
    'true'
  );

  const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);

  const parsedFriendList = await parseFriendList(friendList);
  const friendRooms = parsedFriendList.map(({ userid }: { userid: string })=> userid);

  setTimeout(() => {
    if (friendRooms.length > 0) {
      socket.to(friendRooms).emit('connected', true, socket.user.username);
    }
  }, 100);

  setTimeout(() => socket.emit('friends', parsedFriendList), 100);
};


const addFriend = async (socket: any, friendName: string, cb: any) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" });
    return;
  }

  const friend = await redisClient.hgetall(`userid:${friendName}`);
  if (!friend?.userid) {
    cb({ done: false, errorMsg: "User doesn't exist!" });
    return;
  }

  const currentFriendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  const parsedFriendList = await parseFriendList(currentFriendList);
  if (parsedFriendList && !!(parsedFriendList.find((friend) => friend.username === friendName))) {
    cb({ done: false, errorMsg: "Friend already added!" });
    return;
  }

  await redisClient.lpush(`friends:${socket.user.username}`, [friendName, friend.userid].join('.'));
  const newFriend = {
    username: friendName,
    userid: friend.userid,
    connected: friend.connected,
  }
  
  cb({ done: true, newFriend });
  return;
};


const disconectUser = async (socket: any) => {
  await redisClient.hset(`userid:${socket.user.username}`, 'connected', 'false');

  const friendsList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1); 
  const friendRooms = await parseFriendList(friendsList).then(friends => friends.map(({ userid }: { userid: string })=> userid));

  setTimeout(() => {
    socket.to(friendRooms).emit('connected', false, socket.user.username);
  }, 100);
};

export {
  authorizeUser,
  initializeUser,
  addFriend,
  disconectUser,
};