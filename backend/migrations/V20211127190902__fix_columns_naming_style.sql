ALTER TABLE collection_google_fact_check RENAME COLUMN claimdDate TO claim_date;

ALTER TABLE collection_google_fact_check RENAME COLUMN publisherName TO publisher_name;

ALTER TABLE collection_google_fact_check RENAME COLUMN publisherSite TO publisher_site;

ALTER TABLE collection_google_fact_check RENAME COLUMN reviewDate TO review_date;

ALTER TABLE collection_google_fact_check RENAME COLUMN textualRating TO textual_rating;

ALTER TABLE collection_google_fact_check RENAME COLUMN languageCode TO language_code;

ALTER TABLE collection_vera_files RENAME COLUMN dateText TO date_text;

ALTER TABLE collection_vera_files RENAME COLUMN imageStyle TO image_style;

ALTER TABLE collection_vera_files RENAME COLUMN imageUrl TO image_url;

