GRANT SELECT ON collection_tweets TO sqoop_user;

GRANT INSERT (collection_id, tweet_id) ON collection_tweets TO sqoop_user;

GRANT UPDATE (collection_id, tweet_id) ON collection_tweets TO sqoop_user;

GRANT DELETE ON collection_tweets TO sqoop_user;

