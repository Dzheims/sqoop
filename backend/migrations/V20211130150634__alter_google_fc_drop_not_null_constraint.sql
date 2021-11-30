ALTER TABLE collection_google_fact_check
    ALTER "text" DROP NOT NULL,
    ALTER claimant DROP NOT NULL,
    ALTER claim_date DROP NOT NULL,
    ALTER publisher_name DROP NOT NULL,
    ALTER publisher_site DROP NOT NULL,
    ALTER url DROP NOT NULL,
    ALTER title DROP NOT NULL,
    ALTER review_date DROP NOT NULL,
    ALTER textual_rating DROP NOT NULL,
    ALTER language_code DROP NOT NULL;

