ALTER TABLE collection_articles
    ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE collection_tweets
    ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE collection_vera_files
    ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE collection_google_fact_check
    ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

