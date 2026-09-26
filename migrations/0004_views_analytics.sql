ALTER TABLE tuitions ADD COLUMN views INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_tuitions_views ON tuitions(views);
