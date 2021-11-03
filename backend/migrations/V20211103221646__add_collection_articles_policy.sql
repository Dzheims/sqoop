ALTER TABLE collection_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY collection_articles_policy ON collection_articles
    FOR ALL TO sqoop_user
        USING (id = current_user_id ());

