package com.example.laboratory_service.entities;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;



@Entity
@Data
@Builder
public class Laboratory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Génération automatique par la base de données
    private Long id;

    private String nom;
    @Column(columnDefinition = "TEXT")
    private String logo;
    private String nrc;
    private boolean active;

    private Date dateActivation;

    public Laboratory(){}
    public Laboratory(String nom, String logo, String nrc, boolean active, Date dateActivation) {
        this.nom = nom;
        this.logo = logo;
        this.nrc = nrc;
        this.active = active;
        this.dateActivation = dateActivation;
    }

    public Laboratory(Long id, String nom, String logo, String nrc, boolean active, Date dateActivation) {
        this.id = id;
        this.nom = nom;
        this.logo = logo;
        this.nrc = nrc;
        this.active = active;
        this.dateActivation = dateActivation;
    }



    public Laboratory(Long id, String nom, boolean active) {
        this.id = id;
        this.nom = nom;
        this.active = active;
    }



    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String nom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String logo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String nrc() {
        return nrc;
    }

    public void setNrc(String nrc) {
        this.nrc = nrc;
    }

    public boolean getActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date dateActivation() {
        return dateActivation;
    }

    public void setDateActivation(Date dateActivation) {
        this.dateActivation = dateActivation;
    }

    public boolean isActive() {
        return active;
    }

}
