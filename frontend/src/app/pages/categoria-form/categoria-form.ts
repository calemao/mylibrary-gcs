import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-categoria-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css'
})
export class CategoriaForm {

  nome = '';
  descricao = '';
  erro = '';

  constructor(private service: LibraryService, private router: Router) { }

  salvar() {
    if (!this.nome.trim()) {
      this.erro = 'Nome é obrigatório.';
      return;
    }
    this.service.criarCategoria({ nome: this.nome, descricao: this.descricao }).subscribe({
      next: () => this.router.navigate(['/categorias']),
      error: () => this.erro = 'Já existe uma categoria com esse nome.'
    });
  }
}