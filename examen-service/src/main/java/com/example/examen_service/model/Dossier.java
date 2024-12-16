package com.example.examen_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dossier {

    private Long numDossier; // Identifiant du dossier

    private Patient patient; // Référence au patient

    private Long fkEmailUtilisateur; // Clé étrangère pour l'utilisateur
    private LocalDate date; // Date de création ou modification
}