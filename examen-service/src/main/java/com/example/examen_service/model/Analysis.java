package com.example.examen_service.model;

import java.util.List;

public class Analysis {

    private Long id; // Identifiant unique de l'analyse
    private Long fkLaboratoireId; // Référence à l'ID du laboratoire
    private String nom; // Nom de l'analyse
    private String description; // Description de l'analyse
    private List<TestAnalysis> testAnalysis; // Liste des tests associés

    // Constructeur sans paramètre
    public Analysis() {
    }

    // Constructeur avec paramètres
    public Analysis(Long id, Long fkLaboratoireId, String nom, String description, List<TestAnalysis> testAnalysis) {
        this.id = id;
        this.fkLaboratoireId = fkLaboratoireId;
        this.nom = nom;
        this.description = description;
        this.testAnalysis = testAnalysis;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFkLaboratoireId() {
        return fkLaboratoireId;
    }

    public void setFkLaboratoireId(Long fkLaboratoireId) {
        this.fkLaboratoireId = fkLaboratoireId;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<TestAnalysis> getTestAnalysis() {
        return testAnalysis;
    }

    public void setTestAnalysis(List<TestAnalysis> testAnalysis) {
        this.testAnalysis = testAnalysis;
    }
}
