package com.mylibrary.service;

import com.mylibrary.entity.Livro;
import com.mylibrary.entity.StatusLivro;
import com.mylibrary.repository.CategoriaRepository;
import com.mylibrary.repository.LivroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final CategoriaRepository categoriaRepository;

    public LivroService(LivroRepository livroRepository,
                        CategoriaRepository categoriaRepository) {
        this.livroRepository = livroRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<Livro> listar() {
        return livroRepository.findAll();
    }

    public List<Livro> filtrar(Long categoriaId, StatusLivro status, String busca) {
        if (busca != null && !busca.isBlank()) {
            return livroRepository
                    .findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCase(busca, busca);
        }
        if (categoriaId != null) {
            return livroRepository.findByCategoriaId(categoriaId);
        }
        if(status != null){
            return livroRepository.findByStatus(status);
        }
        return livroRepository.findAll();
    }

    public Livro buscaPorId(Long id) {
        return livroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Livro não encontrado"));
    }

    public Livro criar(Livro livro) {
        categoriaRepository.findById(livro.getCategoria().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Categoria não encontrada"));
        return livroRepository.save(livro);
    }

    public void deletar(Long id) {
        Livro livro = buscaPorId(id);
        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Não é possível excluir um livro que está emprestado."
            );
        }
    }

}
