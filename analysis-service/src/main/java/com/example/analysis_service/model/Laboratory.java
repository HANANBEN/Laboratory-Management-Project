package com.example.analysis_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
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
