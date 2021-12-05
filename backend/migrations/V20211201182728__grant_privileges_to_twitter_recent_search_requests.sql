GRANT SELECT ON twitter_recent_search_requests TO sqoop_user;

GRANT INSERT (keyword, sources) ON twitter_recent_search_requests TO sqoop_user;

GRANT DELETE ON twitter_recent_search_requests TO sqoop_user;

