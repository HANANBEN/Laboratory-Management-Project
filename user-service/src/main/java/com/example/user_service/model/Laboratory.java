package com.example.user_service.model;

import jakarta.persistence.Column;

import java.util.Date;

public class Laboratory {

    private Long id;
    private String nom;
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

}
