-- Primary Super Admin account. Password is stored as a SHA-256 hash; change it from the Admin accounts panel after login.
UPDATE admin_accounts
SET password_hash='720cc6d8dbd181dc491df839071fc8ce0033536317c6802d4980087a658e92f4',
    display_name='Primary Super Admin',
    role='super_admin',
    status='active',
    updated_at=datetime('now')
WHERE username='admin';
