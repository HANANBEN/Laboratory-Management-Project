package com.example.analysis_service.entities;

import com.example.analysis_service.model.Laboratory;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "analysis")
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fk_laboratoire_id")
    private Long fkLaboratoireId;

    @Transient
    private Laboratory laboratory;

    private String nom;

    private String description;

    @OneToMany(mappedBy = "analysis", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TestAnalysis> testAnalysis;

    // Default constructor
    public Analysis() {
    }

    // Constructor with parameters
    public Analysis(Long id, Long fkLaboratoireId, Laboratory laboratory, String nom, String description, List<TestAnalysis> testAnalysis) {
        this.id = id;
        this.fkLaboratoireId = fkLaboratoireId;
        this.laboratory = laboratory;
        this.nom = nom;
        this.description = description;
        this.testAnalysis = testAnalysis;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFkLaboratoireId() {
        return fkLaboratoireId;
    }

    public void setFkLaboratoireId(Long fkLaboratoireId) {
        this.fkLaboratoireId = fkLaboratoireId;
    }

    public Laboratory getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(Laboratory laboratory) {
        this.laboratory = laboratory;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<TestAnalysis> getTestAnalysis() {
        return testAnalysis;
    }

    public void setTestAnalysis(List<TestAnalysis> testAnalysis) {
        this.testAnalysis = testAnalysis;
    }
}
