package com.example.examen_service.model;

import java.time.LocalDate;

public class Patient {

    private Long id; // Identifiant du patient
    private String nomComplet; // Nom complet du patient
    private LocalDate dateNaissance; // Date de naissance
    private String lieuDeNaissance; // Lieu de naissance
    private String sexe; // Sexe du patient
    private String typePieceIdentite; // Type de pièce d'identité
    private String numPieceIdentite; // Numéro de la pièce d'identité
    private String adresse; // Adresse du patient
    private String numTel; // Numéro de téléphone
    private String email; // Email du patient
    private String visiblePour; // Visibilité ou permissions associées

    // Constructeur sans paramètre
    public Patient() {
    }

    // Constructeur avec paramètres
    public Patient(Long id, String nomComplet, LocalDate dateNaissance, String lieuDeNaissance, String sexe,
                   String typePieceIdentite, String numPieceIdentite, String adresse, String numTel, String email, String visiblePour) {
        this.id = id;
        this.nomComplet = nomComplet;
        this.dateNaissance = dateNaissance;
        this.lieuDeNaissance = lieuDeNaissance;
        this.sexe = sexe;
        this.typePieceIdentite = typePieceIdentite;
        this.numPieceIdentite = numPieceIdentite;
        this.adresse = adresse;
        this.numTel = numTel;
        this.email = email;
        this.visiblePour = visiblePour;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getLieuDeNaissance() {
        return lieuDeNaissance;
    }

    public void setLieuDeNaissance(String lieuDeNaissance) {
        this.lieuDeNaissance = lieuDeNaissance;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getTypePieceIdentite() {
        return typePieceIdentite;
    }

    public void setTypePieceIdentite(String typePieceIdentite) {
        this.typePieceIdentite = typePieceIdentite;
    }

    public String getNumPieceIdentite() {
        return numPieceIdentite;
    }

    public void setNumPieceIdentite(String numPieceIdentite) {
        this.numPieceIdentite = numPieceIdentite;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVisiblePour() {
        return visiblePour;
    }

    public void setVisiblePour(String visiblePour) {
        this.visiblePour = visiblePour;
    }
}
