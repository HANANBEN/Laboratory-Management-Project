package com.example.examen_service.model;

import java.time.LocalDate;

public class Dossier {

    private Long numDossier; // Identifiant du dossier
    private Patient patient; // Référence au patient
    private Long fkEmailUtilisateur; // Clé étrangère pour l'utilisateur
    private LocalDate date; // Date de création ou modification

    // Constructeur sans paramètre
    public Dossier() {
    }

    // Constructeur avec paramètres
    public Dossier(Long numDossier, Patient patient, Long fkEmailUtilisateur, LocalDate date) {
        this.numDossier = numDossier;
        this.patient = patient;
        this.fkEmailUtilisateur = fkEmailUtilisateur;
        this.date = date;
    }

    // Getters et Setters
    public Long getNumDossier() {
        return numDossier;
    }

    public void setNumDossier(Long numDossier) {
        this.numDossier = numDossier;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Long getFkEmailUtilisateur() {
        return fkEmailUtilisateur;
    }

    public void setFkEmailUtilisateur(Long fkEmailUtilisateur) {
        this.fkEmailUtilisateur = fkEmailUtilisateur;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
