import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, Livro, Emprestimo, EmprestimoDTO } from '../models/library.model';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    private api = 'http://localhost:8080/api';  

    constructor(private http: HttpClient) { }

    listarCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.api}/categorias`);
    }

    criarCategoria(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(`${this.api}/categorias`, categoria);
    }

    deletarCategoria(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/categorias/${id}`);
    }

    listarLivros(categoriaId?: number, status?: string, busca?: string): Observable<Livro[]> {
        let params = new HttpParams();
        if (categoriaId) params = params.set('categoriaId', categoriaId);
        if (status) params = params.set('status', status);
        if (busca) params = params.set('busca', busca);
        return this.http.get<Livro[]>(`${this.api}/livros`, { params });
    }

    buscarLivroPorId(id: number): Observable<Livro> {
        return this.http.get<Livro>(`${this.api}/livros/${id}`);
    }

    criarLivro(livro: Livro): Observable<Livro> {
        return this.http.post<Livro>(`${this.api}/livros`, livro);
    }

    deletarLivro(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/livros/${id}`);
    }

    listarEmprestimos(): Observable<Emprestimo[]> {
        return this.http.get<Emprestimo[]>(`${this.api}/emprestimos`);
    }

    listarAtivos(): Observable<Emprestimo[]> {
        return this.http.get<Emprestimo[]>(`${this.api}/emprestimos/ativos`);
    }

    listarAtrasados(): Observable<Emprestimo[]> {
        return this.http.get<Emprestimo[]>(`${this.api}/emprestimos/atrasados`);
    }

    emprestar(dto: EmprestimoDTO): Observable<Emprestimo> {
        return this.http.post<Emprestimo>(`${this.api}/emprestimos/emprestar`, dto);
    }

    devolver(id: number): Observable<Emprestimo> {
        return this.http.post<Emprestimo>(`${this.api}/emprestimos/${id}/devolver`, {});
    }
}
