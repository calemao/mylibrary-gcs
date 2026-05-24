import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Livro } from '../../models/library.model';

@Component({
  selector: 'app-emprestimo-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './emprestimo-form.html',
  styleUrl: './emprestimo-form.css'
})
export class EmprestimoForm implements OnInit {

  livros: Livro[] = [];
  livroId: number | null = null;
  nomePessoa = '';
  telefone = '';
  dataDevolucaoPrevista = '';
  erro = '';
  carregandoLivros = false;

  constructor(private service: LibraryService, private router: Router) {}

  ngOnInit() {
    this.carregandoLivros = true;
    this.service.listarLivros(undefined, 'DISPONIVEL').subscribe({
      next: (l) => {
        console.log('[EmprestimoForm] listarLivros resposta:', l);
        this.livros = l;
        this.carregandoLivros = false;
      },
      error: (err) => {
        console.error('[EmprestimoForm] Erro ao carregar livros:', err);
        this.erro = 'Erro ao carregar lista de livros. Verifique se o servidor está disponível.';
        this.carregandoLivros = false;
      }
    });
  }

  salvar() {
    if (this.livroId === null || !this.nomePessoa.trim() || !this.dataDevolucaoPrevista) {
      this.erro = 'Livro, nome e data de devolução são obrigatórios.';
      return;
    }
    this.service.emprestar({
      livroId: this.livroId,
      nomePessoa: this.nomePessoa,
      telefone: this.telefone,
      dataDevolucaoPrevista: this.dataDevolucaoPrevista
    }).subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => this.erro = 'Erro ao registrar empréstimo. Verifique se o livro está disponível.'
    });
  }
}