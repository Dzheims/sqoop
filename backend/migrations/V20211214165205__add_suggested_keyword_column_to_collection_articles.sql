ALTER TABLE collection_articles
    ADD COLUMN suggested_keywords text[];

GRANT INSERT (suggested_keywords) ON collection_articles TO sqoop_user;

