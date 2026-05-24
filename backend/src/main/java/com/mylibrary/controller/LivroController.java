package com.mylibrary.controller;

import com.mylibrary.entity.Livro;
import com.mylibrary.entity.StatusLivro;
import com.mylibrary.service.LivroService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    private final LivroService service;

    public LivroController(LivroService service) {
        this.service = service;
    }

    @GetMapping
    public List<Livro> listar(
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(required = false) StatusLivro status,
            @RequestParam(required = false) String busca) {
        return service.filtrar(categoriaId, status, busca);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscaPorId(id));
    }

    @GetMapping("/{id}/emprestimos")
    public ResponseEntity<List<?>> historico(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscaPorId(id).getEmprestimos());
    }

    @PostMapping
    public ResponseEntity<Livro> criar(@Valid @RequestBody Livro livro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(livro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
