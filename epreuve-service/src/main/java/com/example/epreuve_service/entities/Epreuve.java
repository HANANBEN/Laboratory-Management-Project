package com.example.epreuve_service.entities;

import com.example.epreuve_service.model.Analysis;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "epreuve")
@Data
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

<<<<<<< HEAD
    public Epreuve(Long id, Long fkIdAnalyse, String nom) {
        this.id = id;
        this.fkIdAnalyse = fkIdAnalyse;

        this.nom = nom;
    }

    public Epreuve() {
    }

=======
    // Constructeur sans paramètre
    public Epreuve() {
    }

    // Constructeur avec paramètres
    public Epreuve(Long id, Long fkIdAnalyse, Analysis analysis, String nom) {
        this.id = id;
        this.fkIdAnalyse = fkIdAnalyse;
        this.analysis = analysis;
        this.nom = nom;
    }

    // Getters et Setters
>>>>>>> 62175538e4ab8441cec4582bd65be791bd502657
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 62175538e4ab8441cec4582bd65be791bd502657
