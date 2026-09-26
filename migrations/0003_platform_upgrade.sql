CREATE TABLE IF NOT EXISTS custom_field_definitions (id TEXT PRIMARY KEY, label TEXT NOT NULL, field_type TEXT NOT NULL DEFAULT 'text', options_json TEXT NOT NULL DEFAULT '[]', enabled INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_tuitions_featured ON tuitions(featured, posted_at);
