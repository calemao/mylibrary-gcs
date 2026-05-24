import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Categoria } from '../../models/library.model';

@Component({
  selector: 'app-livro-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css'
})
export class LivroForm implements OnInit {

  titulo = '';
  autor = '';
  isbn = '';
  ano?: number;
  categoriaId?: number;
  categorias: Categoria[] = [];
  erro = '';

  constructor(private service: LibraryService, private router: Router) { }

  ngOnInit() {
    this.service.listarCategorias().subscribe(c => this.categorias = c);
  }

  salvar() {
    if (!this.titulo.trim() || !this.autor.trim() || !this.categoriaId) {
      this.erro = 'Título, autor e categoria são obrigatórios.';
      return;
    }
    this.service.criarLivro({
      titulo: this.titulo,
      autor: this.autor,
      isbn: this.isbn,
      ano: this.ano,
      categoria: { id: this.categoriaId }
    }).subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => this.erro = 'Erro ao cadastrar livro.'
    });
  }
}