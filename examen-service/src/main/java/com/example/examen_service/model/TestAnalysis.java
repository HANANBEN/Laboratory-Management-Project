package com.example.examen_service.model;

public class TestAnalysis {

    private Long id; // Identifiant unique du test
    private Analysis analysis; // Objet Analysis associé
    private String nomTest; // Nom du test
    private String sousEpreuve; // Sous-épreuve
    private Double intervalMinDeReference; // Intervalle minimal de référence
    private Double intervalMaxDeReference; // Intervalle maximal de référence
    private String uniteDeReference; // Unité de référence
    private String details; // Détails du test

    // Constructeur sans paramètre
    public TestAnalysis() {
    }

    // Constructeur avec paramètres
    public TestAnalysis(Long id, Analysis analysis, String nomTest, String sousEpreuve, Double intervalMinDeReference,
                        Double intervalMaxDeReference, String uniteDeReference, String details) {
        this.id = id;
        this.analysis = analysis;
        this.nomTest = nomTest;
        this.sousEpreuve = sousEpreuve;
        this.intervalMinDeReference = intervalMinDeReference;
        this.intervalMaxDeReference = intervalMaxDeReference;
        this.uniteDeReference = uniteDeReference;
        this.details = details;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Analysis getAnalysis() {
        return analysis;
    }

    public void setAnalysis(Analysis analysis) {
        this.analysis = analysis;
    }

    public String getNomTest() {
        return nomTest;
    }

    public void setNomTest(String nomTest) {
        this.nomTest = nomTest;
    }

    public String getSousEpreuve() {
        return sousEpreuve;
    }

    public void setSousEpreuve(String sousEpreuve) {
        this.sousEpreuve = sousEpreuve;
    }

    public Double getIntervalMinDeReference() {
        return intervalMinDeReference;
    }

    public void setIntervalMinDeReference(Double intervalMinDeReference) {
        this.intervalMinDeReference = intervalMinDeReference;
    }

    public Double getIntervalMaxDeReference() {
        return intervalMaxDeReference;
    }

    public void setIntervalMaxDeReference(Double intervalMaxDeReference) {
        this.intervalMaxDeReference = intervalMaxDeReference;
    }

    public String getUniteDeReference() {
        return uniteDeReference;
    }

    public void setUniteDeReference(String uniteDeReference) {
        this.uniteDeReference = uniteDeReference;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
