package com.example.analysis_service.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "extendedTestAnalysis", types = TestAnalysis.class)
public interface TestAnalysisProjection {

    Long getId(); // Assuming ID is present in TestAnalysis

    String getNomTest(); // Name of the Test

    String getSousEpreuve(); // Subtest description

    Double getIntervalMinDeReference(); // Min reference interval

    Double getIntervalMaxDeReference(); // Max reference interval

    String getUniteDeReference(); // Reference unit

    String getDetails(); // Details of the test

    @Value("#{target.analysis != null ? target.analysis.id : null}")
    Long getAnalysisId(); // Includes the associated Analysis ID

    @Value("#{target.analysis != null ? target.analysis.nom : null}")
    String getAnalysisNom(); // Includes the associated Analysis name

    @Value("#{target.analysis != null ? target.analysis.description : null}")
    String getAnalysisDescription(); // Includes the associated Analysis description
}
