package com.example.laboratory_service.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@Builder
public class Laboratory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Génération automatique par la base de données
    private Long id;

    @Column(nullable = false)
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
