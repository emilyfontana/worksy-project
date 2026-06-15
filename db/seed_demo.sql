USE worksy;


-- USERS


INSERT INTO users (
    username,
    email,
    password_hash,
    user_type,
    bio,
    phone,
    city,
    skills
)
VALUES

(
    'Tech Solutions',
    'contato@techsolutions.com',
    '$2b$10$demoHashEmpresa1',
    'company',
    'Empresa especializada em soluções web.',
    '41999990001',
    'Curitiba',
    JSON_ARRAY()
),

(
    'Agencia Criativa',
    'contato@agenciacriativa.com',
    '$2b$10$demoHashEmpresa2',
    'company',
    'Agência focada em design e marketing digital.',
    '41999990002',
    'Curitiba',
    JSON_ARRAY()
),

(
    'Joao Silva',
    'joao@email.com',
    '$2b$10$demoHashFreela1',
    'freelancer',
    'Desenvolvedor Frontend React.',
    '41999990003',
    'Curitiba',
    JSON_ARRAY('React', 'JavaScript', 'HTML', 'CSS')
),

(
    'Maria Santos',
    'maria@email.com',
    '$2b$10$demoHashFreela2',
    'freelancer',
    'UX/UI Designer.',
    '41999990004',
    'São Paulo',
    JSON_ARRAY('Figma', 'UX', 'UI', 'Prototipação')
),

(
    'Pedro Oliveira',
    'pedro@email.com',
    '$2b$10$demoHashFreela3',
    'freelancer',
    'Desenvolvedor Backend Node.js.',
    '41999990005',
    'Florianópolis',
    JSON_ARRAY('Node.js', 'Express', 'MySQL')
);


-- JOBS


INSERT INTO jobs (
    company_id,
    title,
    job_description,
    category,
    budget,
    job_location,
    urgent,
    job_status
)
VALUES

(
    1,
    'Desenvolvedor React',
    'Desenvolvimento de interface para plataforma web.',
    'Frontend',
    3500.00,
    'Remoto',
    TRUE,
    'open'
),

(
    1,
    'Desenvolvedor Node.js',
    'Construção de APIs REST utilizando Express.',
    'Backend',
    4500.00,
    'Remoto',
    FALSE,
    'open'
),

(
    2,
    'Designer UX/UI',
    'Criação de protótipos e design de interfaces.',
    'Design',
    3000.00,
    'São Paulo',
    FALSE,
    'open'
);


-- APPLICATIONS


INSERT INTO applications (
    job_id,
    freelancer_id,
    cover_letter,
    application_status
)
VALUES

(
    1,
    3,
    'Tenho experiência sólida com React e Vite.',
    'accepted'
),

(
    3,
    4,
    'Atuo com UX/UI há mais de 4 anos.',
    'accepted'
),

(
    2,
    5,
    'Especialista em Node.js e Express.',
    'pending'
),

(
    2,
    3,
    'Também possuo experiência com backend.',
    'rejected'
),

(
    1,
    5,
    'Posso contribuir com integrações frontend/backend.',
    'pending'
);


-- CHATS


INSERT INTO chats (
    job_id,
    company_id,
    freelancer_id,
    is_active
)
VALUES

(
    1,
    1,
    3,
    TRUE
),

(
    3,
    2,
    4,
    TRUE
);


-- MESSAGES


INSERT INTO messages (
    chat_id,
    sender_id,
    content
)
VALUES

(
    1,
    1,
    'Olá João, gostamos do seu perfil.'
),

(
    1,
    3,
    'Obrigado! Estou disponível para conversar.'
),

(
    1,
    1,
    'Podemos iniciar o projeto ainda esta semana.'
),

(
    2,
    2,
    'Olá Maria, analisamos seu portfólio.'
),

(
    2,
    4,
    'Fico feliz! Estou à disposição.'
),

(
    2,
    2,
    'Vamos marcar uma reunião para alinhar os detalhes.'
);