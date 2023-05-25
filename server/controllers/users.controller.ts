import bcrypt from 'bcrypt';
import uid from 'uuid-random';
import pool from '../db/db';


const getUser = async (req: any, res: any) => {
  try {
    if (req.session.user && req.session.user.username) {
      res.json({ signIn: true, username: req.session.user.username })
    } else {
      res.json({ signIn: false })
    }
  } catch (err) {
    console.error(err)
  }
};

const signIn = async (req: any, res: any) => {
  try {
    const existingUser = await pool.query(
      'SELECT id, username, passhash, userId FROM users u WHERE u.username=$1',
      [req.body.username],
    );

    if (existingUser.rowCount) {
      const isSamePass = await bcrypt.compare(req.body.password, existingUser.rows[0].passhash);
      if (isSamePass) {
        req.session.user = {
          username: req.body.username,
          id: existingUser.rows[0].id,
          userid: existingUser.rows[0].userid,
        };
        res.json({ signIn: true, username: req.body.username })
      }
    } else {
      res.json({ signIn: false, status: 'Wrong username or password' });
    }
  } catch (err) {
    console.error(err)
  }
};

const signUp = async (req: any, res: any) => {
  try {
    const existingUser = await pool.query(
      'SELECT username FROM users WHERE username=$1',
      [req.body.username],
    );
    
    if (!existingUser.rowCount) {
      const hashPass = await bcrypt.hash(req.body.password, 10);
      const newUser = await pool.query(
        'INSERT INTO users(username, passhash, userId) values($1,$2,$3) RETURNING id, username, userId',
        [req.body.username, hashPass, uid()] as [string, string, string],
      );

      req.session.user = {
        username: req.body.username,
        id: newUser.rows[0].id,
        userid: newUser.rows[0].userid,
      };
        res.json({ signIn: true, username: req.body.username })
    } else {
      res.json({ signIn: false, status: 'Username taken' });
    }
  } catch (err) {
    console.error(err)
  }

};

const controller = {
  getUser,
  signIn,
  signUp
}

export default controller