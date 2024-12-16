package com.example.examen_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Analysis {

    private Long id; // Identifiant unique de l'analyse

    private Long fkLaboratoireId; // Référence à l'ID du laboratoire

    private String nom; // Nom de l'analyse

    private String description; // Description de l'analyse

    private List<TestAnalysis> testAnalysis; // Liste des tests associés
}