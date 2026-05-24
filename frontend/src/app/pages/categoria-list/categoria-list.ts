import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Categoria } from '../../models/library.model';

@Component({
  selector: 'app-categoria-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css'
})
export class CategoriaList implements OnInit {

  categorias: Categoria[] = [];
  mensagem = '';

  constructor(private service: LibraryService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listarCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  deletar(id: number) {
    if (confirm('Deseja excluir esta categoria?')) {
      this.service.deletarCategoria(id).subscribe({
        next: () => {
          this.mensagem = 'Categoria excluída com sucesso!';
          this.carregar();
        },
        error: () => {
          this.mensagem = 'Não é possível excluir categoria com livros vinculados.';
        }
      });
    }
  }
}