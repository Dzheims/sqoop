ALTER POLICY collection_articles_policy ON collection_articles TO sqoop_user
    USING (collection_id = (
        SELECT
            id FROM collections
        WHERE
            user_id = current_user_id ()
                AND id = collection_id));

ALTER POLICY collection_tweets_policy ON collection_tweets TO sqoop_user
    USING (collection_id = (
        SELECT
            id FROM collections
        WHERE
            user_id = current_user_id ()
                AND id = collection_id));

ALTER POLICY collection_google_fact_check_policy ON collection_google_fact_check TO sqoop_user
    USING (collection_id = (
        SELECT
            id FROM collections
        WHERE
            user_id = current_user_id ()
                AND id = collection_id));

ALTER POLICY collection_vera_files_policy ON collection_vera_files TO sqoop_user
    USING (collection_id = (
        SELECT
            id FROM collections
        WHERE
            user_id = current_user_id ()
                AND id = collection_id));

