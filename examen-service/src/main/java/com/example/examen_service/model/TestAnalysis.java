package com.example.examen_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestAnalysis {

    private Long id; // Identifiant unique du test

    private Analysis analysis; // Objet Analysis associé

    private String nomTest; // Nom du test

    private String sousEpreuve; // Sous-épreuve

    private Double intervalMinDeReference; // Intervalle minimal de référence

    private Double intervalMaxDeReference; // Intervalle maximal de référence

    private String uniteDeReference; // Unité de référence

    private String details; // Détails du test
}