ALTER TABLE collections
    DROP CONSTRAINT collection_unique_title;

ALTER TABLE news_feeds
    DROP CONSTRAINT news_feed_unique_title;

ALTER TABLE twitter_feeds
    DROP CONSTRAINT twitter_feed_unique_title;

ALTER TABLE collections
    ADD CONSTRAINT collection_unique_title UNIQUE (title, user_id);

ALTER TABLE news_feeds
    ADD CONSTRAINT news_feed_unique_title UNIQUE (title, user_id);

ALTER TABLE twitter_feeds
    ADD CONSTRAINT twitter_feed_unique_title UNIQUE (title, user_id);

