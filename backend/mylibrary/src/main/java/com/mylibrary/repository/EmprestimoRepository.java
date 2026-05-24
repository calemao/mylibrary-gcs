package com.mylibrary.repository;

import com.mylibrary.entity.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {

    List<Emprestimo> findByDataDevolucaoEfetivaIsNull();

    @Query("SELECT e FROM Emprestimo e WHERE e.dataDevolucaoPrevista < :hoje AND e.dataDevolucaoEfetiva IS NULL")
    List<Emprestimo> findAtrasados(LocalDate hoje);

    List<Emprestimo> findByLivroId(Long livroId);
}
