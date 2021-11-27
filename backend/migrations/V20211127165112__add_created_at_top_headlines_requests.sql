ALTER TABLE top_headlines_requests
    ADD created_at TIMESTAMPTZ NOT NULL DEFAULT Now();

