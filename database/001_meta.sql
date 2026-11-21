-- BRAWL // NEXUS metadata-only public battle sample; Cloudflare D1.
-- Only known 2-team matches with explicit outcomes. No ChatGPT/Brawlify data imported.
CREATE TABLE IF NOT EXISTS meta_matches (
 id TEXT PRIMARY KEY,
 map_key TEXT NOT NULL,
 map_name TEXT NOT NULL,
 mode TEXT NOT NULL,
 played_at TEXT NOT NULL,
 band TEXT NOT NULL,
 winner_team INTEGER NOT NULL,
 team_size INTEGER NOT NULL,
 observed_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_meta_map_mode ON meta_matches(map_key, mode, band, played_at);
CREATE TABLE IF NOT EXISTS meta_picks (
 match_id TEXT NOT NULL,
 player_tag TEXT NOT NULL,
 brawler_id INTEGER NOT NULL,
 brawler_name TEXT NOT NULL,
 team_idx INTEGER NOT NULL,
 won INTEGER NOT NULL,
 trophies INTEGER,
 star INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY(match_id, player_tag)
);
CREATE INDEX IF NOT EXISTS idx_meta_picks_match ON meta_picks(match_id, team_idx, brawler_id);
CREATE INDEX IF NOT EXISTS idx_meta_picks_brawler ON meta_picks(brawler_id, match_id);
CREATE TABLE IF NOT EXISTS meta_crawl_queue (
 tag TEXT PRIMARY KEY,
 due_at INTEGER NOT NULL DEFAULT 0,
 last_polled INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_meta_crawl_due ON meta_crawl_queue(due_at, last_polled);
