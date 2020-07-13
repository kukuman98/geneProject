CREATE TABLE member(
    ID VARCHAR(10) NOT NULL,
    username VARCHAR(20),
    password VARCHAR(20),
    email VARCHAR(20),
    phone VARCHAR(20),
    class INT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE patient(
    patient_ID VARCHAR(10) NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    PRIMARY KEY (patient_ID)
);

CREATE TABLE patient_mutation(
    patient_mutation_ID VARCHAR(20) NOT NULL,
    chr_ID VARCHAR(20) NOT NULL,
    position VARCHAR(20) NOT NULL,
    atgc VARCHAR(10) NOT NULL,
    m_atgc  VARCHAR(10) NOT NULL,
    PRIMARY KEY (patient_mutation_ID)
);


CREATE TABLE patient_chr_list(
    patient_ID VARCHAR(20) NOT NULL,
    patient_mutation_ID VARCHAR(20) NOT NULL,
    PRIMARY KEY (patient_ID,patient_mutation_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (patient_mutation_ID) REFERENCES patient_mutation(patient_mutation_ID) ON DELETE CASCADE
);

CREATE TABLE match_mutation(
    match_mutation_ID VARCHAR(20) NOT NULL,
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
    patient_ID VARCHAR(20) NOT NULL,
    match_mutation_ID VARCHAR(20) NOT NULL,
    PRIMARY KEY (patient_ID,match_mutation_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (match_mutation_ID) REFERENCES match_mutation(match_mutation_ID) ON DELETE CASCADE
);


CREATE TABLE medical_history(
    history_ID VARCHAR(20) NOT NULL,
    medical_name VARCHAR(30),
    PRIMARY KEY (history_ID)
);

CREATE TABLE medical_history_list(
    patient_ID VARCHAR(20) NOT NULL,
    history_ID VARCHAR(20) NOT NULL,
    PRIMARY KEY (patient_ID,history_ID),
    FOREIGN KEY (patient_ID) REFERENCES patient(patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (history_ID) REFERENCES medical_history(history_ID) ON DELETE CASCADE
);

create table premature_mutation(
    premature_mutation_ID VARCHAR(20) NOT NULL,
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
