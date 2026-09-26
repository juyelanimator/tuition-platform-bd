ALTER TABLE media_accounts ADD COLUMN phone TEXT DEFAULT '';
ALTER TABLE media_accounts ADD COLUMN description TEXT DEFAULT '';
ALTER TABLE media_accounts ADD COLUMN commission_type TEXT DEFAULT '';
ALTER TABLE media_accounts ADD COLUMN commission_amount REAL;
ALTER TABLE media_accounts ADD COLUMN status TEXT NOT NULL DEFAULT 'active';
CREATE INDEX IF NOT EXISTS idx_media_status ON media_accounts(status, enabled);
