
-- WORKSY DATABASE V1
-- Banco de Dados Oficial do MVP


DROP DATABASE IF EXISTS worksy;

CREATE DATABASE worksy
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE worksy;


-- USERS


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    user_type ENUM('freelancer', 'company') NOT NULL,

    profile_picture VARCHAR(500),

    bio TEXT,

    phone VARCHAR(20),

    city VARCHAR(100),

    skills JSON,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP
);


-- JOBS


CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,

    company_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    job_description TEXT NOT NULL,

    category VARCHAR(100),

    budget DECIMAL(10,2),

    job_location VARCHAR(150),

    urgent BOOLEAN NOT NULL DEFAULT FALSE,

    job_status ENUM('open','closed','filled') NOT NULL DEFAULT 'open',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL DEFAULT NULL
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_jobs_company
        FOREIGN KEY (company_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- APPLICATIONS


CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    job_id INT NOT NULL,

    freelancer_id INT NOT NULL,

    cover_letter TEXT,

    application_status ENUM('pending','accepted','rejected') NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_applications_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_applications_freelancer
        FOREIGN KEY (freelancer_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_application
        UNIQUE (job_id, freelancer_id)
);


-- CHATS


CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,

    job_id INT NOT NULL,

    company_id INT NOT NULL,

    freelancer_id INT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chats_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chats_company
        FOREIGN KEY (company_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chats_freelancer
        FOREIGN KEY (freelancer_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_chat
        UNIQUE (job_id, company_id, freelancer_id)
);


-- MESSAGES


CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,

    chat_id INT NOT NULL,

    sender_id INT NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_messages_chat
        FOREIGN KEY (chat_id)
        REFERENCES chats(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_messages_sender
        FOREIGN KEY (sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- INDICES


CREATE INDEX idx_jobs_company
ON jobs(company_id);

CREATE INDEX idx_applications_job
ON applications(job_id);

CREATE INDEX idx_applications_freelancer
ON applications(freelancer_id);

CREATE INDEX idx_chats_job
ON chats(job_id);

CREATE INDEX idx_chats_company
ON chats(company_id);

CREATE INDEX idx_chats_freelancer
ON chats(freelancer_id);

CREATE INDEX idx_messages_chat
ON messages(chat_id);

CREATE INDEX idx_messages_sender
ON messages(sender_id);

