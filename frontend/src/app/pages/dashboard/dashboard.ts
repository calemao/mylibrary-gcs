import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Emprestimo, Livro } from '../../models/library.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalLivros = 0;
  livrosDisponiveis = 0;
  livrosEmprestados = 0;
  emprestimosAtivos = 0;
  emprestimosAtrasados: Emprestimo[] = [];
  erroConexao = '';

  constructor(private service: LibraryService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.erroConexao = '';

    this.service.listarLivros().subscribe({
      next: (livros: Livro[]) => {
        console.log('[Dashboard] listarLivros resposta:', livros);
        this.totalLivros = livros.length;
        this.livrosDisponiveis = livros.filter(l => l.status === 'DISPONIVEL').length;
        this.livrosEmprestados = livros.filter(l => l.status === 'EMPRESTADO').length;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('[Dashboard] listarLivros erro:', err);
        this.erroConexao = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 8080.';
        this.cdr.detectChanges();
      }
    });

    this.service.listarAtivos().subscribe({
      next: (ativos: Emprestimo[]) => {
        console.log('[Dashboard] listarAtivos resposta:', ativos);
        this.emprestimosAtivos = ativos.length;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('[Dashboard] listarAtivos erro:', err)
    });

    this.service.listarAtrasados().subscribe({
      next: (atrasados: Emprestimo[]) => {
        console.log('[Dashboard] listarAtrasados resposta:', atrasados);
        this.emprestimosAtrasados = atrasados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('[Dashboard] listarAtrasados erro:', err)
    });
  }
}