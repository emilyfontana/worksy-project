Projeto acadêmico desenvolvido no 5º período do curso de Ciência da Computação na PUCPR, na disciplina de Experiência Criativa.

Integrantes:


* Cecilia Lucchesi Mardegan
* Emily Pontes Fontana
* Erick Maestri de Souza
* Julia Machado Kociolek
* Sophia Post Ploposki

---

# Worksy

Aplicação web fullstack desenvolvida por estudantes do 5º período de Ciência da Computação como projeto da disciplina **Experiência Criativa**. A plataforma conecta freelancers a empresas, permitindo a publicação de vagas, candidaturas, gerenciamento de perfis e comunicação em tempo real entre as partes.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Modelo de Banco de Dados](#modelo-de-banco-de-dados)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
- [Estrutura de Diretórios](#estrutura-de-diretórios)

---

## Visão Geral

O Worksy é um MVP (Minimum Viable Product) de marketplace de trabalho freelance. O sistema suporta dois tipos de usuário — **freelancer** e **empresa** — cada um com fluxos distintos: empresas publicam vagas e avaliam candidatos; freelancers exploram oportunidades, se candidatam e se comunicam diretamente com os contratantes por meio de um chat em tempo real.

---

## Funcionalidades

- Cadastro e autenticação de usuários com distinção de perfil (freelancer / empresa)
- Autenticação segura via JWT
- Armazenamento de senhas com hash bcrypt
- Publicação, edição e exclusão de vagas por empresas
- Candidatura a vagas com carta de apresentação
- Chat em tempo real entre freelancer e empresa
- Gerenciamento de perfil com bio, cidade, telefone, foto e habilidades (JSON)
- Listagem de candidatos e vagas favoritas

---

## Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Função |
|---|---|---|
| Node.js | — | Ambiente de execução |
| Express | ^4.21.2 | Framework HTTP |
| MySQL2 | ^3.22.5 | Driver do banco de dados |
| Socket.IO | ^4.8.3 | Comunicação em tempo real |
| JSON Web Token | ^9.0.3 | Autenticação stateless |
| bcrypt | ^6.0.0 | Hash de senhas |
| dotenv | ^17.4.2 | Gerenciamento de variáveis de ambiente |
| nodemon | ^3.1.9 | Reinicialização automática em desenvolvimento |

### Frontend
| Tecnologia | Versão | Função |
|---|---|---|
| React | ^19.2.6 | Biblioteca de interface |
| Vite | ^8.0.12 | Bundler e servidor de desenvolvimento |
| React Router DOM | ^7.6.0 | Roteamento client-side |
| Socket.IO Client | ^4.8.3 | Integração com o servidor de WebSocket |
| Tailwind CSS | ^4.3.0 | Estilização utilitária |
| Lucide React | ^0.383.0 | Ícones |

### Banco de Dados
- **MySQL** com charset `utf8mb4` e collation `utf8mb4_unicode_ci`

---

## Arquitetura do Projeto

O projeto segue uma arquitetura cliente-servidor desacoplada:

```
worksy-project/
├── backend/        # API RESTful + servidor Socket.IO
├── frontend/       # SPA em React consumindo a API
└── db/             # Scripts SQL de criação e seed do banco
```

O backend expõe uma API REST com autenticação por JWT e um servidor Socket.IO para mensagens em tempo real. O frontend consome ambos via camada de serviço centralizada (`Services/api.js` e Socket.IO client).

---

## Modelo de Banco de Dados

O banco contém cinco tabelas principais:

| Tabela | Descrição |
|---|---|
| `users` | Usuários do sistema (freelancers e empresas) |
| `jobs` | Vagas publicadas pelas empresas |
| `applications` | Candidaturas de freelancers às vagas |
| `chats` | Canais de conversa vinculados a uma vaga e a um par empresa–freelancer |
| `messages` | Mensagens trocadas dentro de um chat |

Todas as relações são garantidas por chaves estrangeiras com `ON DELETE CASCADE`. Índices foram definidos nas colunas de maior frequência de consulta (`company_id`, `job_id`, `freelancer_id`, `chat_id`).

---

## Pré-requisitos

- Node.js v18 ou superior
- MySQL 8.0 ou superior
- npm

---

## Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/worksy-project.git
cd worksy-project
```

### 2. Configurar o banco de dados

```bash
mysql -u root -p < db/worksy_database.sql
```

Para popular o banco com dados de demonstração:

```bash
mysql -u root -p worksy < db/seed_demo.sql
```

### 3. Configurar e iniciar o backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na raiz do diretório `backend` (veja [Variáveis de Ambiente](#variáveis-de-ambiente)), depois:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

### 4. Configurar e iniciar o frontend

```bash
cd ../frontend
npm install
npm run dev
```

> **Nota:** caso o `npm install` retorne erros de conflito, utilize:
> ```bash
> npm install --legacy-peer-deps
> ```
> O Tailwind CSS v4 pode gerar incompatibilidades de `peerDependencies` com outras bibliotecas. A flag instrui o npm a ignorar esses conflitos de versão e prosseguir com a instalação normalmente.

A aplicação estará disponível em `http://localhost:5173`.

> O frontend realiza as chamadas à API através do prefixo `/api`, que deve ser configurado como proxy no `vite.config.js` apontando para `http://localhost:3000`.


---

## Variáveis de Ambiente

Crie o arquivo `backend/.env` com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=worksy
JWT_SECRET=chave_secreta_de_sua_escolha
```

> **Atenção:** nunca versione o arquivo `.env`. Ele já está incluído no `.gitignore`.

---

## Rotas da API

### Autenticação — `/auth`
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/auth/register` | Cadastro de novo usuário | Não |
| POST | `/auth/login` | Login e geração do JWT | Não |
| GET | `/auth/me` | Dados do usuário autenticado | Sim |

### Usuários — `/users`
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/users` | Listar todos os usuários | Sim |
| GET | `/users/:id` | Buscar usuário por ID | Sim |
| PUT | `/users/:id` | Atualizar perfil | Sim |

### Vagas — `/jobs`
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| GET | `/jobs` | Listar todas as vagas | Não |
| GET | `/jobs/:id` | Buscar vaga por ID | Não |
| POST | `/jobs` | Criar nova vaga | Sim |
| PUT | `/jobs/:id` | Atualizar vaga | Sim |
| DELETE | `/jobs/:id` | Remover vaga | Sim |

### Candidaturas — `/applications`
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/applications` | Criar candidatura | Sim |
| GET | `/applications/job/:jobId` | Listar candidatos de uma vaga | Sim |
| PUT | `/applications/:id` | Atualizar status da candidatura | Sim |

### Chats — `/chats`
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/chats` | Criar ou recuperar chat existente | Sim |
| GET | `/chats/user/:userId` | Listar chats do usuário | Sim |

### Mensagens — `/messages`
| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | `/messages` | Enviar mensagem (HTTP) | Sim |
| GET | `/messages/chat/:chatId` | Histórico de mensagens | Sim |

### Eventos Socket.IO
| Evento (emit) | Payload | Descrição |
|---|---|---|
| `join_chat` | `chatId` | Entra na sala do chat |
| `send_message` | `{ chat_id, sender_id, content }` | Envia mensagem em tempo real |

| Evento (on) | Payload | Descrição |
|---|---|---|
| `receive_message` | `{ id, chat_id, sender_id, content, created_at }` | Recebe mensagem em tempo real |

---

## Estrutura de Diretórios

```
worksy-project/
│
├── backend/
│   ├── Config/
│   │   └── db.js                  # conexão com o MySQL
│   ├── Controllers/
│   │   ├── authController.js      # registro, login e perfil
│   │   ├── userController.js      # crud de usuários
│   │   ├── jobController.js       # crud de vagas
│   │   ├── applicationController.js
│   │   ├── chatController.js
│   │   └── messageController.js
│   ├── Middleware/
│   │   └── authMiddleware.js      # verificação do JWT
│   ├── Routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── applicationRoutes.js
│   │   ├── chatRoutes.js
│   │   └── messageRoutes.js
│   ├── Socket/
│   │   └── socket.js              # servidor socket.io
│   ├── index.js                   # ponto de entrada
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Services/
│   │   │   └── api.js             # camada de comunicação http
│   │   ├── pages/
│   │   │   ├── company/ # pasta com abas jsx exclusivas da visão da empresa 
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── FavoriteJobs.jsx
│   │   │   ├── Payments.jsx
│   │   │   ├── BottomNav.jsx
│   │   │   └── DrawerMenu.jsx
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── db/
    ├── worksy_database.sql        # schema do banco
    ├── seed_dev.sql               # dados para desenvolvimento
    └── seed_demo.sql              # dados para demonstração
```

---

