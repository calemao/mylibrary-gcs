import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibraryService } from '../../services/library.service';

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
  emprestimosAtrasados: any[] = [];

  constructor(private service: LibraryService) {}

  ngOnInit() {
    this.service.listarLivros().subscribe(livros => {
      this.totalLivros = livros.length;
      this.livrosDisponiveis = livros.filter(l => l.status === 'DISPONIVEL').length;
      this.livrosEmprestados = livros.filter(l => l.status === 'EMPRESTADO').length;
    });

    this.service.listarAtivos().subscribe(ativos => {
      this.emprestimosAtivos = ativos.length;
    });

    this.service.listarAtrasados().subscribe(atrasados => {
      this.emprestimosAtrasados = atrasados;
    });
  }
}