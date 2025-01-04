package com.example.examen_service.entities;

import com.example.examen_service.model.*;
import jakarta.persistence.*;

@Entity
@Table(name = "examen")
public class Examen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "fkNumDossier", nullable = false)
    private Long fkNumDossier;

    @Transient
    private Dossier dossier;

    @Column(name = "fkIdEpeuve", nullable = false)
    private Long fkIdEpeuve;

    @Transient
    private Epreuve epreuve;

    @Column(name = "fkIdTestAnalysis", nullable = false)
    private Long fkIdTestAnalysis;

    @Transient
    private Analysis testAnalysis;

    @Column(name = "fkPatientId", nullable = false)
    private Long fkPatientId;

    @Transient
    private Patient patient;

    @Column(name = "resultat")
    private String resultat;

    // Constructeur sans paramètre
    public Examen() {}

    // Constructeur avec paramètres
    public Examen(Long id, Long fkNumDossier, Dossier dossier, Long fkIdEpeuve,
                  Epreuve epreuve, Long fkIdTestAnalysis, TestAnalysis testAnalysis,
                  Long fkPatientId, Patient patient, String resultat) {
        this.id = id;
        this.fkNumDossier = fkNumDossier;
        this.dossier = dossier;
        this.fkIdEpeuve = fkIdEpeuve;
        this.epreuve = epreuve;
        this.fkIdTestAnalysis = fkIdTestAnalysis;
        this.testAnalysis = testAnalysis.getAnalysis();
        this.fkPatientId = fkPatientId;
        this.patient = patient;
        this.resultat = resultat;
    }

    // Getters et setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFkNumDossier() {
        return fkNumDossier;
    }

    public void setFkNumDossier(Long fkNumDossier) {
        this.fkNumDossier = fkNumDossier;
    }

    public Dossier getDossier() {
        return dossier;
    }

    public void setDossier(Dossier dossier) {
        this.dossier = dossier;
    }

    public Long getFkIdEpeuve() {
        return fkIdEpeuve;
    }

    public void setFkIdEpeuve(Long fkIdEpeuve) {
        this.fkIdEpeuve = fkIdEpeuve;
    }

    public Epreuve getEpreuve() {
        return epreuve;
    }

    public void setEpreuve(Epreuve epreuve) {
        this.epreuve = epreuve;
    }

    public Long getFkIdTestAnalysis() {
        return fkIdTestAnalysis;
    }

    public void setFkIdTestAnalysis(Long fkIdTestAnalysis) {
        this.fkIdTestAnalysis = fkIdTestAnalysis;
    }

    public Analysis getTestAnalysis() {
        return testAnalysis;
    }

    public void setTestAnalysis(Analysis testAnalysis) {
        this.testAnalysis = testAnalysis;
    }

    public Long getFkPatientId() {
        return fkPatientId;
    }

    public void setFkPatientId(Long fkPatientId) {
        this.fkPatientId = fkPatientId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getResultat() {
        return resultat;
    }

    public void setResultat(String resultat) {
        this.resultat = resultat;
    }
}
