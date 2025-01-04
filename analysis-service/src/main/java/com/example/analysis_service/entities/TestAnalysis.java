package com.example.analysis_service.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
@Entity
@Table(name = "testAnalyse")
public class TestAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "fkIdAnalyse", referencedColumnName = "id" ,nullable = true)
    @JsonBackReference
    private Analysis analysis;
    private String nomTest;

    private String sousEpreuve;

    private Double intervalMinDeReference;

    private Double intervalMaxDeReference;

    private String uniteDeReference;

    private String details;

    // Default constructor
    public TestAnalysis() {
    }

    // Constructor with parameters
    public TestAnalysis(Long id, Analysis analysis, String nomTest, String sousEpreuve, Double intervalMinDeReference, Double intervalMaxDeReference, String uniteDeReference, String details) {
        this.id = id;
        this.analysis = analysis;
        this.nomTest = nomTest;
        this.sousEpreuve = sousEpreuve;
        this.intervalMinDeReference = intervalMinDeReference;
        this.intervalMaxDeReference = intervalMaxDeReference;
        this.uniteDeReference = uniteDeReference;
        this.details = details;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Analysis getAnalysis() {
        return analysis;
    }

    public void setAnalysis(Analysis analysis) {
        this.analysis = analysis;
    }

    public String getNomTest() {
        return nomTest;
    }

    public void setNomTest(String nomTest) {
        this.nomTest = nomTest;
    }

    public String getSousEpreuve() {
        return sousEpreuve;
    }

    public void setSousEpreuve(String sousEpreuve) {
        this.sousEpreuve = sousEpreuve;
    }

    public Double getIntervalMinDeReference() {
        return intervalMinDeReference;
    }

    public void setIntervalMinDeReference(Double intervalMinDeReference) {
        this.intervalMinDeReference = intervalMinDeReference;
    }

    public Double getIntervalMaxDeReference() {
        return intervalMaxDeReference;
    }

    public void setIntervalMaxDeReference(Double intervalMaxDeReference) {
        this.intervalMaxDeReference = intervalMaxDeReference;
    }

    public String getUniteDeReference() {
        return uniteDeReference;
    }

    public void setUniteDeReference(String uniteDeReference) {
        this.uniteDeReference = uniteDeReference;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

}
