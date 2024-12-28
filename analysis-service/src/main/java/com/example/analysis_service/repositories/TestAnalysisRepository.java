package com.example.analysis_service.repositories;

import com.example.analysis_service.entities.TestAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

public interface TestAnalysisRepository extends JpaRepository<TestAnalysis, Long> {

    // Recherche par nom de test
    @RestResource(path = "by-nomTest", rel = "by-nomTest")
    List<TestAnalysis> findByNomTest(String nomTest);

    // Recherche par sous-épreuve
    @RestResource(path = "by-sousEpreuve", rel = "by-sousEpreuve")
    List<TestAnalysis> findBySousEpreuve(String sousEpreuve);

    // Recherche par intervalle minimum de référence
    @RestResource(path = "by-intervalMinDeReference", rel = "by-intervalMinDeReference")
    List<TestAnalysis> findByIntervalMinDeReference(Double intervalMinDeReference);

    // Recherche par intervalle maximum de référence
    @RestResource(path = "by-intervalMaxDeReference", rel = "by-intervalMaxDeReference")
    List<TestAnalysis> findByIntervalMaxDeReference(Double intervalMaxDeReference);

    // Recherche par unité de référence
    @RestResource(path = "by-uniteDeReference", rel = "by-uniteDeReference")
    List<TestAnalysis> findByUniteDeReference(String uniteDeReference);

    // Recherche par analyse associée (par id d'analyse)
    @RestResource(path = "by-analysis-id", rel = "by-analysis-id")
    List<TestAnalysis> findByAnalysisId(Long analysisId);
}
