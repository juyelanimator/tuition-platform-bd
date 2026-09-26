-- Demo data only. Change admin password before production.
INSERT OR IGNORE INTO site_settings(key,value) VALUES ('default_language','bn'),('admin_username','admin');
-- Admin authentication uses ADMIN_PASSWORD_HASH secret; no admin password is stored in D1.
INSERT OR IGNORE INTO tuitions(id,code,class_level,subjects,student_gender,tuition_type,salary_type,salary_min,salary_max,salary_unit,days_per_week,time_text,division,district,thana,area,description,phone,whatsapp,status,expires_at)
VALUES ('demo-1','T-1025','Class 8','English,Mathematics','any','Home','fixed',5000,5000,'month',3,'5:00 PM – 7:00 PM','Chattogram','Chattogram','Double Mooring','Agrabad','Experienced tutor required for regular homework support and exam preparation.','01700000000','8801700000000','published',datetime('now','+15 days'));
