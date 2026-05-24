package com.mylibrary.controller;

import com.mylibrary.dto.EmprestimoDTO;
import com.mylibrary.entity.Emprestimo;
import com.mylibrary.service.EmprestimoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    private final EmprestimoService service;

    public EmprestimoController(EmprestimoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Emprestimo> listar() {
        return service.listar();
    }

    @GetMapping("/ativos")
    public List<Emprestimo> listarAtivos() {
        return service.listarAtivos();
    }

    @GetMapping("/atrasados")
    public List<Emprestimo> listarAtrasados() {
        return service.listarAtrasados();
    }

    @PostMapping("/emprestar")
    public ResponseEntity<Emprestimo> emprestar(@Valid @RequestBody EmprestimoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.emprestar(dto));
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<Emprestimo> devolver(@PathVariable Long id) {
        return ResponseEntity.ok(service.devolver(id));
    }
}
