GRANT SELECT ON collection_articles TO sqoop_user;

GRANT INSERT (collection_id, description, published_at, source_name, title, url, url_to_img) ON collection_articles TO sqoop_user;

GRANT UPDATE (collection_id, description, published_at, source_name, title, url, url_to_img) ON collection_articles TO sqoop_user;

GRANT DELETE ON collection_articles TO sqoop_user;

