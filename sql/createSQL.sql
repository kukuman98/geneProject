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
    class INT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE patient(
    patient_ID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    birth DATE,
    gender VARCHAR(10),
    PRIMARY KEY (patient_ID)
);

CREATE TABLE patient_mutation(
    patient_mutation_ID INT NOT NULL AUTO_INCREMENT,
    chr_ID VARCHAR(20) NOT NULL,
    position VARCHAR(20) NOT NULL,
    atgc VARCHAR(10) NOT NULL,
    m_atgc  VARCHAR(10) NOT NULL,
    PRIMARY KEY (patient_mutation_ID)
);


CREATE TABLE patient_chr_list(
    patient_ID INT NOT NULL ,
    patient_mutation_ID INT NOT NULL,
    PRIMARY KEY (patient_ID,patient_mutation_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (patient_mutation_ID) REFERENCES patient_mutation(patient_mutation_ID) ON DELETE CASCADE
);

CREATE TABLE match_mutation(
    match_mutation_ID INT NOT NULL AUTO_INCREMENT,
    chr_ID VARCHAR(20) NOT NULL,
    position VARCHAR(20) NOT NULL,
    atgc VARCHAR(10) NOT NULL,
    m_atgc  VARCHAR(10) NOT NULL,
    exposed_disease INTEGER,
    exposed_health INTEGER,
    unexposed_disease INTEGER,
    unexposed_health INTEGER,
    PRIMARY KEY (match_mutation_ID)
);


CREATE TABLE match_chr_list(
    patient_ID INT NOT NULL,
    match_mutation_ID INT NOT NULL,
    PRIMARY KEY (patient_ID,match_mutation_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (match_mutation_ID) REFERENCES match_mutation(match_mutation_ID) ON DELETE CASCADE
);


CREATE TABLE medical_history(
    history_ID INT NOT NULL AUTO_INCREMENT,
    medical_name VARCHAR(30),
    PRIMARY KEY (history_ID)
);

CREATE TABLE medical_history_list(
    patient_ID INT NOT NULL,
    history_ID INT NOT NULL,
    PRIMARY KEY (patient_ID,history_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (history_ID) REFERENCES medical_history(history_ID) ON DELETE CASCADE
);

create table premature_mutation(
    premature_mutation_ID INT NOT NULL AUTO_INCREMENT,
    chr_ID VARCHAR(20) NOT NULL,
    position VARCHAR(20) NOT NULL,
    atgc VARCHAR(10) NOT NULL,
    m_atgc  VARCHAR(10) NOT NULL,
    exposed_disease INTEGER,
    exposed_health INTEGER,
    unexposed_disease INTEGER,
    unexposed_health INTEGER,
    PRIMARY KEY (premature_mutation_ID)
);
