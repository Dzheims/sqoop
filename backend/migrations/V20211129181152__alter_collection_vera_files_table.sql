ALTER TABLE collection_vera_files
  ALTER author DROP NOT NULL,
  ALTER category DROP NOT NULL,
  ALTER "date" DROP NOT NULL,
  ALTER date_text DROP NOT NULL,
  ALTER description DROP NOT NULL,
  ALTER image_style DROP NOT NULL,
  ALTER image_url DROP NOT NULL,
  ALTER url DROP NOT NULL,
  ALTER title DROP NOT NULL;

