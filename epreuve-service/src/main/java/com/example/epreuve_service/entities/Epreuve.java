package com.example.epreuve_service.entities;


import com.example.epreuve_service.model.Analysis;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "epreuve")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Epreuve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fkIdAnalyse")
    private Long fkIdAnalyse;

    @Transient
    private Analysis analysis;

    private String nom;

    public Epreuve(Long id, Long fkIdAnalyse, String nom) {
        this.id = id;
        this.fkIdAnalyse = fkIdAnalyse;

        this.nom = nom;
    }

    public Epreuve() {
    }
}