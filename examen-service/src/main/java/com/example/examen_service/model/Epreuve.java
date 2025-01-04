package com.example.examen_service.model;

public class Epreuve {

    private Long id; // Identifiant de l'épreuve
    private Long fkIdAnalyse; // Référence à l'analyse associée
    private String nom; // Nom de l'épreuve

    // Constructeur sans paramètre
    public Epreuve() {
    }

    // Constructeur avec paramètres
    public Epreuve(Long id, Long fkIdAnalyse, String nom) {
        this.id = id;
        this.fkIdAnalyse = fkIdAnalyse;
        this.nom = nom;
    }

    // Getters et Setters
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

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
