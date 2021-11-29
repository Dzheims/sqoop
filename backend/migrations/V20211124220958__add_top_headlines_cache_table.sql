CREATE TABLE top_headlines (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    author text,
    content text,
    description text,
    published_at text,
    source_name text,
    source_id text,
    title text,
    url text,
    url_to_image text
);
