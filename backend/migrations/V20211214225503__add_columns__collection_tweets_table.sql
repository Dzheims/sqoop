ALTER TABLE collection_tweets
    ADD COLUMN author_id text,
    ADD COLUMN "text" text,
    ADD COLUMN name text,
    ADD COLUMN profile_image_url text,
    ADD COLUMN username text,
    ADD COLUMN verified boolean;

