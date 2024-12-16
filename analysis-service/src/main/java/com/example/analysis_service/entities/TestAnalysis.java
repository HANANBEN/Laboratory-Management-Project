package com.example.analysis_service.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "testAnalyse")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fkIdAnalyse", referencedColumnName = "id")
    private Analysis analysis;

    private String nomTest;

    private String sousEpreuve;

    private Double intervalMinDeReference;

    private Double intervalMaxDeReference;

    private String uniteDeReference;

    private String details;


}
