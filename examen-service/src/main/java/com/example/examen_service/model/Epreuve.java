package com.example.examen_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Epreuve {

    private Long id; // Identifiant de l'épreuve

    private Long fkIdAnalyse; // Référence à l'analyse associée

    private String nom; // Nom de l'épreuve
}