CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  passhash VARCHAR NOT NULL
);

INSERT INTO users(username, passhash) values($1,$2);