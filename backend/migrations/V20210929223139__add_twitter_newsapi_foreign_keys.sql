ALTER TABLE twitter_feeds ADD user_id int REFERENCES users(user_id);
ALTER TABLE news_feeds ADD user_id int REFERENCES users(user_id);

CREATE INDEX ON twitter_feeds(user_id);
CREATE INDEX ON news_feeds(user_id);
