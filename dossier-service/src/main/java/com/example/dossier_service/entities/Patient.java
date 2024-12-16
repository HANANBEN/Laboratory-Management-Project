package com.example.dossier_service.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "patient")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomComplet;

    private LocalDate dateNaissance;

    private String lieuDeNaissance;

    private String sexe;

    private String typePieceIdentite;

    private String numPieceIdentite;

    private String adresse;

    private String numTel;

    private String email;

    private String visiblePour;


}
