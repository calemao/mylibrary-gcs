# Changelog

## [1.0.1] - 2025-05-25

### Fixed

- Botão Excluir ocultado para livros com status EMPRESTADO no frontend (#4)

## [1.0.0] - 2025-05-25

### Added

- RF01: CRUD de Categorias com validação de exclusão (#1)
- RF02: CRUD de Livros com filtros por categoria, status e busca (#2)
- RF03: Sistema de empréstimos — emprestar e devolver com controle de status (#3)
- Pipeline CI: build automático de backend (Maven) e frontend (Angular) (#5)
- Dark mode com persistência via localStorage

### Technical

- 3 entidades JPA: Categoria, Livro, Emprestimo
- Service Layer com lógica de negócio (emprestar/devolver muda status)
- Branch protection configurado no main
- Branches de feature para cada requisito funcional

## [0.1.0] - 2025-05-24

### Added

- Configuração inicial do repositório
- Estrutura de pastas: backend/ e frontend/
- README.md com instruções de execução
