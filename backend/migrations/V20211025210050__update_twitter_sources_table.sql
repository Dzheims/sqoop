ALTER TABLE twitter_accounts RENAME TO twitter_sources;

INSERT INTO twitter_sources (account_name, account_username) VALUES
('Official MMDA', 'MMDA'),
('TESDA', 'tesdaofficial'),
('NDRRMC', 'NDRRMC_OpCen'),
('NEDA Philippines', 'NEDAhq'),
('Philippine Red Cross', 'philredcross'),
('CHR Philippines', 'chrgovph'),
('Philstar.com', 'PhilstarNews'),
('The Manila Times', 'TheManilaTimes'),
('Business Mirror', 'BusinessMirror'),
('News5 ', 'News5PH'),
('UNTV News and Rescue ', 'UNTVNewsRescue'),
('PTVph', 'PTVph'),
('Yahoo Philippines', 'YahooPH'),
('Manila Standard', 'MlaStandard'),
('BusinessWorld', 'bworldph'),
('Visit Philippines', 'TourismPHL');