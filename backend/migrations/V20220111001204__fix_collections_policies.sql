DROP POLICY collection_articles_policy ON collections;

CREATE POLICY collection_policy ON collections
    FOR ALL TO sqoop_user
        USING (user_id = current_user_id ());

