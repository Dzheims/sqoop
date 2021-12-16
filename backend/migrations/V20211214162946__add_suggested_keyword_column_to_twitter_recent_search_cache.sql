ALTER TABLE twitter_recent_search_cache
    ADD COLUMN suggested_keywords text[];

GRANT INSERT (suggested_keywords) ON twitter_recent_search_cache TO sqoop_user;