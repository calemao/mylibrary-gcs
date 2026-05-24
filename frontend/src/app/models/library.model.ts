export interface Categoria {
    id?: number;
    nome: string;
    descricao?: string;
}

export type StatusLivro = 'DISPONIVEL' | 'EMPRESTADO';

export interface Livro {
    id?: number;
    titulo: string;
    autor: string;
    isbn?: string;
    ano?: number;
    status?: StatusLivro;
    categoria: { id: number };
}

export interface Emprestimo {
    id?: number;
    livro?: Livro;
    nomePessoa: string;
    telefone?: string;
    dataEmprestimo?: string;
    dataDevolucaoPrevista?: string;
    dataDevolucaoEfetiva?: string;
}

export interface EmprestimoDTO {
    livroId: number;
    nomePessoa: string;
    telefone?: string;        
    dataDevolucaoPrevista: string;
}