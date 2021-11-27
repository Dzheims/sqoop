ALTER TABLE collections
    ADD CONSTRAINT collection_unique_title UNIQUE (title);

ALTER TABLE news_feeds
    ADD CONSTRAINT news_feed_unique_title UNIQUE (title);

ALTER TABLE twitter_feeds
    ADD CONSTRAINT twitter_feed_unique_title UNIQUE (title);

