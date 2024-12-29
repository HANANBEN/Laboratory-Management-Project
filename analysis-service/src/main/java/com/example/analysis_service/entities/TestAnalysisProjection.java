package com.example.analysis_service.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "extendedTestAnalysis", types = TestAnalysis.class)
public interface TestAnalysisProjection {

    Long getId(); // Assuming ID is present in TestAnalysis

    String getNomTest(); // Name of the Test

    String getSousEpreuve(); // Sub-test name

    Double getIntervalMinDeReference(); // Minimum reference interval

    Double getIntervalMaxDeReference(); // Maximum reference interval

    String getUniteDeReference(); // Unit of reference

    String getDetails(); // Additional details

    @Value("#{target.analysis != null ? target.analysis : null}")
    Object getAnalysisDetails(); // Includes parent Analysis details
}

