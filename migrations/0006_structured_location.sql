ALTER TABLE tuitions ADD COLUMN division TEXT DEFAULT '';
ALTER TABLE tuitions ADD COLUMN district TEXT DEFAULT '';
ALTER TABLE tuitions ADD COLUMN thana TEXT DEFAULT '';
ALTER TABLE tuitions ADD COLUMN landmark TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_tuitions_location ON tuitions(division, district, thana, area);
