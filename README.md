# MyLibrary

Sistema de gerenciamento de biblioteca pessoal — Projeto SENAI

## Tecnologias

- Backend: Spring Boot 3.x + Java 21 + H2 Database
- Frontend: Angular 17+ Standalone Components

## Como executar

### Backend

```bash
cd backend/mylibrary
./mvnw spring-boot:run
```

Acesse: http://localhost:8080
Swagger: http://localhost:8080/swagger-ui/index.html

### Frontend

```bash
cd frontend
npm install
ng serve
```

Acesse: http://localhost:4200

## Funcionalidades

- CRUD de Categorias
- CRUD de Livros com filtros por categoria e status
- Sistema de Empréstimos (emprestar/devolver)
- Dashboard com estatísticas do acervo
- Relatório de empréstimos atrasados

## Desenvolvedor

Christian Amsberg Janner — Faculdade SENAI
