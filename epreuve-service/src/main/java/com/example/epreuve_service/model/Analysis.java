package com.example.epreuve_service.model;

import java.util.Date;

public class Analysis {

    private Long id;
    private Long fkIdLaboratoire;
    private String nom;
    private String description;

    private Date dateCreation;
    private boolean active;

    // Constructeur sans paramètre
    public Analysis() {
    }

    // Constructeur avec paramètres
    public Analysis(Long fkIdLaboratoire, String nom, String description, Date dateCreation, boolean active) {
        this.fkIdLaboratoire = fkIdLaboratoire;
        this.nom = nom;
        this.description = description;
        this.dateCreation = dateCreation;
        this.active = active;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFkIdLaboratoire() {
        return fkIdLaboratoire;
    }

    public void setFkIdLaboratoire(Long fkIdLaboratoire) {
        this.fkIdLaboratoire = fkIdLaboratoire;
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

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}
