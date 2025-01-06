package com.example.epreuve_service.entities;

import com.example.epreuve_service.model.Analysis;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity

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

    public Epreuve() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFkIdAnalyse() {
        return fkIdAnalyse;
    }

    public void setFkIdAnalyse(Long fkIdAnalyse) {
        this.fkIdAnalyse = fkIdAnalyse;
    }

    public Analysis getAnalysis() {
        return analysis;
    }

    public void setAnalysis(Analysis analysis) {
        this.analysis = analysis;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

}

