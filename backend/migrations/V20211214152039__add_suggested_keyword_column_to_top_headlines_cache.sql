ALTER TABLE top_headlines_cache
    ADD COLUMN suggested_keywords text[];

GRANT INSERT (suggested_keywords) ON top_headlines_cache TO sqoop_user;

