GRANT SELECT ON twitter_recent_search_cache_photos TO sqoop_user;

GRANT INSERT (media_key, type, url, twitter_recent_search_cache_id) ON twitter_recent_search_cache_photos TO sqoop_user;

GRANT DELETE ON twitter_recent_search_cache_photos TO sqoop_user;

