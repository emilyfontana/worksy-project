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
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('freelancer','empresa') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



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


--- create table d evagas é preciso que o user aplique a uma vaga para realziar o chat 
CREATE TABLE vagas (

    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(30) NOT NULL, 
    descrição VARCHAR(100) NOT NULL,
    empresa_id INT NOT NULL, 
    salario DECIMAL(10,2),
    modalidade ENUM('Remoto','Presencial','Hibrido'),
    status ENUM('Aberta','Fechada') DEFAULT 'Aberta',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (empresa_id)
    REFERENCES (usuarios_id)


);
--- create table candidaturas após a abertura da vaga de candidatar 

CREATE TABLE candidaturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vagas_id INT NOT NULL, 
    freelancer_id INT NOT NULL,
    tipo ENUM('aprovado','pendente', 'rejeitado',)  DEFAULT 'Pendente',
    data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (freelancer_id)
    REFERENCES (usuario_id),
-- infos do frelancer 

-- infos da vaga
    FOREIGN KEY(vaga_id)
    REFERENCES vagas(id)



);

