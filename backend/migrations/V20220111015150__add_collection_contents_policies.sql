ALTER TABLE collection_articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE collection_tweets ENABLE ROW LEVEL SECURITY;

ALTER TABLE collection_google_fact_check ENABLE ROW LEVEL SECURITY;

ALTER TABLE collection_vera_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY collection_articles_policy ON collection_articles
    FOR ALL TO sqoop_user
        USING (collection_id = (
            SELECT
                id
            FROM
                collections
            WHERE
                user_id = current_user_id ()));

CREATE POLICY collection_tweets_policy ON collection_tweets
    FOR ALL TO sqoop_user
        USING (collection_id = (
            SELECT
                id
            FROM
                collections
            WHERE
                user_id = current_user_id ()));

CREATE POLICY collection_google_fact_check_policy ON collection_google_fact_check
    FOR ALL TO sqoop_user
        USING (collection_id = (
            SELECT
                id
            FROM
                collections
            WHERE
                user_id = current_user_id ()));

CREATE POLICY collection_vera_files_policy ON collection_vera_files
    FOR ALL TO sqoop_user
        USING (collection_id = (
            SELECT
                id
            FROM
                collections
            WHERE
                user_id = current_user_id ()));

