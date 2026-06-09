-- criacao das tabelas 


-- create table usuarios
-- ainda nao possui etapa de cadastro nem de login 

-- create table conversas 

-- create table mensagens

CREATE DATABASE worksy;
USE worksy;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo ENUM('empresa','freelancer') NOT NULL
);

-- nao diferenciar empresa e freelancer, pois ambos podem iniciar conversas e enviar mensagens então serve p os dois tipos de user 

CREATE TABLE conversas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario1_id INT NOT NULL,
    usuario2_id INT NOT NULL,

    FOREIGN KEY (usuario1_id)
    REFERENCES usuarios(id),

    FOREIGN KEY (usuario2_id)
    REFERENCES usuarios(id)
);

CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,

    conversa_id INT NOT NULL,

    remetente_id INT NOT NULL,

    mensagem TEXT NOT NULL,

    enviada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (conversa_id)
    REFERENCES conversas(id),

    FOREIGN KEY (remetente_id)
    REFERENCES usuarios(id)
);
