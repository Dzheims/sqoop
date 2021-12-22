GRANT SELECT ON collection_tweet_photos TO sqoop_user;

GRANT INSERT (media_key, type, url, collection_tweet_id) ON collection_tweet_photos TO sqoop_user;

GRANT DELETE ON collection_tweet_photos TO sqoop_user;

