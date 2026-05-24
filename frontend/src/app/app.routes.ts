import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
    { path: 'categorias', loadComponent: () => import('./pages/categoria-list/categoria-list').then(m => m.CategoriaList) },
    { path: 'categorias/nova', loadComponent: () => import('./pages/categoria-form/categoria-form').then(m => m.CategoriaForm) },
    { path: 'livros', loadComponent: () => import('./pages/livro-list/livro-list').then(m => m.LivroList) },
    { path: 'livros/novo', loadComponent: () => import('./pages/livro-form/livro-form').then(m => m.LivroForm) },
    { path: 'livros/:id', loadComponent: () => import('./pages/livro-detail/livro-detail').then(m => m.LivroDetail) },
    { path: 'emprestimos/novo', loadComponent: () => import('./pages/emprestimo-form/emprestimo-form').then(m => m.EmprestimoForm) },
];