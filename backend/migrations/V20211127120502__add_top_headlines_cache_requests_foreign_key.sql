ALTER TABLE top_headlines_cache
    ADD top_headlines_request_id int NOT NULL REFERENCES top_headlines_requests (id) ON DELETE CASCADE;

CREATE INDEX ON top_headlines_cache (top_headlines_request_id);

