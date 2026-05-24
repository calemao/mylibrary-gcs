import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Livro, Categoria } from '../../models/library.model';

@Component({
  selector: 'app-livro-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './livro-list.html',
  styleUrl: './livro-list.css'
})
export class LivroList implements OnInit {

  livros: Livro[] = [];
  categorias: Categoria[] = [];
  mensagem = '';
  busca = '';
  categoriaId: number | null = null;
  status = '';

  constructor(private service: LibraryService) {}

  ngOnInit() {
    this.service.listarCategorias().subscribe(c => this.categorias = c);
    this.carregar();
  }

  carregar() {
    this.service.listarLivros(this.categoriaId ?? undefined, this.status || undefined, this.busca || undefined)
      .subscribe(data => this.livros = data);
  }

  deletar(id: number) {
    if (confirm('Deseja excluir este livro?')) {
      this.service.deletarLivro(id).subscribe({
        next: () => { this.mensagem = 'Livro excluído!'; this.carregar(); },
        error: () => this.mensagem = 'Não é possível excluir livro emprestado.'
      });
    }
  }
}