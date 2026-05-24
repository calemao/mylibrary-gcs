import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Livro, Emprestimo } from '../../models/library.model';

@Component({
  selector: 'app-livro-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './livro-detail.html',
  styleUrl: './livro-detail.css'
})
export class LivroDetail implements OnInit {

  livro?: Livro;
  emprestimos: Emprestimo[] = [];
  mensagem = '';

  constructor(
    private service: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.buscarLivroPorId(id).subscribe(l => this.livro = l);
  }

  devolver(emprestimoId: number) {
    if (confirm('Confirmar devolução?')) {
      this.service.devolver(emprestimoId).subscribe({
        next: () => {
          this.mensagem = 'Livro devolvido com sucesso!';
          const id = Number(this.route.snapshot.paramMap.get('id'));
          this.service.buscarLivroPorId(id).subscribe(l => this.livro = l);
        },
        error: () => this.mensagem = 'Erro ao devolver livro.'
      });
    }
  }

  deletar() {
    if (confirm('Deseja excluir este livro?')) {
      this.service.deletarLivro(this.livro!.id!).subscribe({
        next: () => this.router.navigate(['/livros']),
        error: () => this.mensagem = 'Não é possível excluir livro emprestado.'
      });
    }
  }
}