DROP TABLE member;
DROP TABLE medical_history_list;
DROP TABLE match_chr_list;
DROP TABLE patient_chr_list;
DROP TABLE medical_history;
DROP TABLE patient;
DROP TABLE patient_mutation;
DROP TABLE premature_mutation;
DROP TABLE match_mutation;


CREATE TABLE member(
    ID INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(20),
    phone VARCHAR(20),
    level INT,
    PRIMARY KEY (ID)
);

CREATE TABLE patient(
    patient_ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email VARCHAR(30) NOT NULL,
    birth DATE,
    gender VARCHAR(10),
    allergen VARCHAR(100),
    PRIMARY KEY (patient_ID)
);

CREATE TABLE medical_history(
    history_ID VARCHAR(20) NOT NULL,
    medical_name VARCHAR(30),
    hospital VARCHAR(20),
    medical_date DATE,
    medical_instructions VARCHAR(50),
    medical_description VARCHAR(120),
    PRIMARY KEY (history_ID)
);

CREATE TABLE medical_history_list(
    patient_ID INT NOT NULL,
    history_ID VARCHAR(20) NOT NULL,
    PRIMARY KEY (patient_ID,history_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (history_ID) REFERENCES medical_history(history_ID) ON DELETE CASCADE
);
