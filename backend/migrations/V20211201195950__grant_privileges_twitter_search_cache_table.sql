GRANT SELECT ON twitter_recent_search_cache TO sqoop_user;

GRANT INSERT (tweet_id, author_id, created_at, text, name, profile_image_url, username, verified, twitter_recent_search_request_id) ON twitter_recent_search_cache TO sqoop_user;

GRANT DELETE ON twitter_recent_search_cache TO sqoop_user;

