ALTER TABLE collections ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE news_feeds ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE twitter_feeds ADD created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

