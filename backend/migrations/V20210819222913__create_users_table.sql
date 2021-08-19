CREATE table users (
  user_id INT GENERATED BY DEFAULT AS IDENTITY primary key,
  username TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL
);