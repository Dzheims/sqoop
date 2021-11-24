GRANT SELECT ON top_headlines_cache TO sqoop_user;

GRANT INSERT (author, content, description, published_at, source_name, source_id, title, url, url_to_image) ON top_headlines_cache TO sqoop_user;

