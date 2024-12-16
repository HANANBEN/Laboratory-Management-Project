package com.example.examen_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
}