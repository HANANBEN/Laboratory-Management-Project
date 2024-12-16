package com.example.epreuve_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Analysis{

    private Long id;
    private Long fkIdLaboratoire;
    private String nom;
    private String description;
}
