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
  emprestimoAtivo?: Emprestimo;
  mensagem = '';
  erro = '';
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private service: LibraryService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.buscarLivroPorId(id).subscribe({
      next: (l) => { this.livro = l; this.carregando = false; },
      error: () => { this.erro = 'Livro não encontrado.'; this.carregando = false; }
    });

    this.service.listarAtivos().subscribe({
      next: (ativos) => {
        this.emprestimoAtivo = ativos.find(e => e.livro?.id === id);
      },
      error: () => {}
    });
  }

  devolver() {
    if (!this.emprestimoAtivo?.id) return;
    if (!confirm('Confirmar devolução deste livro?')) return;

    this.service.devolver(this.emprestimoAtivo.id).subscribe({
      next: () => {
        this.mensagem = '✅ Devolução registrada com sucesso!';
        if (this.livro) this.livro.status = 'DISPONIVEL';
        this.emprestimoAtivo = undefined;
        this.erro = '';
      },
      error: () => this.erro = 'Erro ao registrar devolução.'
    });
  }

  deletar() {
    if (!this.livro?.id) return;
    if (!confirm('Deseja excluir este livro?')) return;

    this.service.deletarLivro(this.livro.id).subscribe({
      next: () => this.router.navigate(['/livros']),
      error: () => this.erro = 'Não é possível excluir livro emprestado.'
    });
  }
}