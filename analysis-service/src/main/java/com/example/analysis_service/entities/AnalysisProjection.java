package com.example.analysis_service.entities;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "extendedAnalysis", types = Analysis.class)
public interface AnalysisProjection {

    Long getId(); // Assuming ID is present in Analysis

    String getNom(); // Name of the Analysis

    String getDescription(); // Description of the Analysis

    Long getFkLaboratoireId(); // Foreign key for Laboratory

    @Value("#{target.fkLaboratoireId != null ? @LaboratoryClientService.getLaboratoryById(target.fkLaboratoireId) : null}")
    Object getLaboratoryDetails(); // Uses Feign Client to fetch Laboratory details

    @Value("#{target.testAnalysis != null ? target.testAnalysis : null}")
    Object getTestAnalysisDetails(); // Includes TestAnalysis details
}

