import { Component, OnInit } from '@angular/core';
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

  constructor(private service: LibraryService) { }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.erroConexao = '';

    this.service.listarLivros().subscribe({
      next: (livros: Livro[]) => {
        this.totalLivros = livros.length;
        this.livrosDisponiveis = livros.filter(l => l.status === 'DISPONIVEL').length;
        this.livrosEmprestados = livros.filter(l => l.status === 'EMPRESTADO').length;
      },
      error: () => {
        this.erroConexao = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 8080.';
      }
    });

    this.service.listarAtivos().subscribe({
      next: (ativos: Emprestimo[]) => this.emprestimosAtivos = ativos.length,
      error: (err) => console.error('[Dashboard] listarAtivos erro:', err)
    });

    this.service.listarAtrasados().subscribe({
      next: (atrasados: Emprestimo[]) => this.emprestimosAtrasados = atrasados,
      error: (err) => console.error('[Dashboard] listarAtrasados erro:', err)
    });
  }
}