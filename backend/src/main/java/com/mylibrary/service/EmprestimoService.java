package com.mylibrary.service;

import com.mylibrary.dto.EmprestimoDTO;
import com.mylibrary.entity.Emprestimo;
import com.mylibrary.entity.Livro;
import com.mylibrary.entity.StatusLivro;
import com.mylibrary.repository.EmprestimoRepository;
import com.mylibrary.repository.LivroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(EmprestimoRepository emprestimoRepository,
                             LivroRepository livroRepository) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
    }

    public List<Emprestimo> listar() {
        return emprestimoRepository.findAll();
    }

    public List<Emprestimo> listarAtivos() {
        return emprestimoRepository.findByDataDevolucaoEfetivaIsNull();
    }

    public List<Emprestimo> listarAtrasados() {
        return emprestimoRepository.findAtrasados(LocalDate.now());
    }

    public List<Emprestimo> listarPorLivro(Long livroId) {
        return emprestimoRepository.findByLivroId(livroId);
    }

    public Emprestimo emprestar(EmprestimoDTO dto) {
        Livro livro = livroRepository.findById(dto.getLivroId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Livro não encontrado"));

        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Livro já está emprestado.");
        }

        livro.setStatus(StatusLivro.EMPRESTADO);
        livroRepository.save(livro);

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setLivro(livro);
        emprestimo.setNomePessoa(dto.getNomePessoa());
        emprestimo.setTelefone(dto.getTelefone());
        emprestimo.setDataDevolucaoPrevista(dto.getDataDevolucaoPrevista());

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo devolver(Long id ) {
        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow (() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Empréstimo não encontrado."));

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Livro já foi devolvido.");
        }

        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());
        emprestimo.getLivro().setStatus(StatusLivro.DISPONIVEL);
        livroRepository.save(emprestimo.getLivro());

        return emprestimoRepository.save(emprestimo);
    }
}


