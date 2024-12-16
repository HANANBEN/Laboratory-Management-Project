package com.example.epreuve_service.entities;


import com.example.epreuve_service.model.Analysis;
import jakarta.persistence.*;

@Entity
@Table(name = "epreuve")
public class Epreuve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fkIdAnalyse")
    private Long fkIdAnalyse;

    @Transient
    private Analysis analysis;

    private String nom;
}