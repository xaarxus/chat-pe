import redisClient from '../redis';

const rateLimiter = async (req: any, res: any, next: any) => {
  const ip = req.connection.removeAddress;
  const [response]: any = await redisClient.multi().incr(ip).expire(ip, 60).exec();

  if (response[1] > 10) res.json({ signIn: false, status: 'Try again in a minute.' })
  else next();
};

export default rateLimiter;
