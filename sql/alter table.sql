-- ALTER TABLE match_mutation ADD COLUMN probability FLOAT AFTER m_atgc;
-- ALTER TABLE match_mutation ADD COLUMN exposed_disease INTEGER AFTER m_atgc;
-- ALTER TABLE match_mutation ADD COLUMN exposed_health INTEGER AFTER exposed_disease;
-- ALTER TABLE match_mutation ADD COLUMN unexposed_disease INTEGER AFTER exposed_health;
-- ALTER TABLE match_mutation ADD COLUMN unexposed_health INTEGER AFTER unexposed_disease;
-- ALTER TABLE match_mutation DROP COLUMN probability;


-- ALTER TABLE member DROP COLUMN username;
-- ALTER TABLE member DROP COLUMN password;
-- ALTER TABLE member DROP COLUMN email;
-- ALTER TABLE member DROP COLUMN phone;
-- ALTER TABLE member ADD COLUMN username VARCHAR(20) AFTER ID;
-- ALTER TABLE member ADD COLUMN password VARCHAR(20) AFTER username;
-- ALTER TABLE member ADD COLUMN email VARCHAR(20) AFTER password;
-- ALTER TABLE member ADD COLUMN phone VARCHAR(20) AFTER email;