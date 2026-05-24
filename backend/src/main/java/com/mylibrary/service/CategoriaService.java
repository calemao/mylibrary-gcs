package com.mylibrary.service;

import com.mylibrary.entity.Categoria;
import com.mylibrary.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository){
        this.repository = repository;
    }

    public List<Categoria> listar() {
        return repository.findAll();
    }

    public Categoria criar(Categoria categoria){
        if (repository.existsByNome(categoria.getNome())) {
            throw new ResponseStatusException
                    (HttpStatus.BAD_REQUEST, "Já existe uma categoria com esse nome.");
        }
        return repository.save(categoria);
    }

    public void deletar(Long id ){
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Categoria não encontrada")
                );
        if (!categoria.getLivros().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Não é possível excluir categoria com livros vinculados.");
    }
    repository.deleteById(id);
    }
}
