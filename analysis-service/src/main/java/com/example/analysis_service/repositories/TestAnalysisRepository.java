package com.example.analysis_service.repositories;

import com.example.analysis_service.entities.TestAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "testAnalyses",
        path = "testAnalyses"
)
@CrossOrigin(origins = "http://localhost:5678")
public interface TestAnalysisRepository extends JpaRepository<TestAnalysis, Long> {

    // Recherche par nom de test
    @Query("SELECT t FROM TestAnalysis t WHERE t.nomTest = :nomTest")
    List<TestAnalysis> findByNomTest(@Param("nomTest") String nomTest);

    // Recherche par sous-épreuve
    @Query("SELECT t FROM TestAnalysis t WHERE t.sousEpreuve = :sousEpreuve")
    List<TestAnalysis> findBySousEpreuve(@Param("sousEpreuve") String sousEpreuve);

    // Recherche par intervalle minimum de référence
    @Query("SELECT t FROM TestAnalysis t WHERE t.intervalMinDeReference = :intervalMinDeReference")
    List<TestAnalysis> findByIntervalMinDeReference(@Param("intervalMinDeReference") Double intervalMinDeReference);

    // Recherche par intervalle maximum de référence
    @Query("SELECT t FROM TestAnalysis t WHERE t.intervalMaxDeReference = :intervalMaxDeReference")
    List<TestAnalysis> findByIntervalMaxDeReference(@Param("intervalMaxDeReference") Double intervalMaxDeReference);

    // Recherche par unité de référence
    @Query("SELECT t FROM TestAnalysis t WHERE t.uniteDeReference = :uniteDeReference")
    List<TestAnalysis> findByUniteDeReference(@Param("uniteDeReference") String uniteDeReference);

    // Recherche par analyse associée (par id d'analyse)
    @Query("SELECT t FROM TestAnalysis t WHERE t.analysis.id = :analysisId")
    List<TestAnalysis> findByAnalysisId(@Param("analysisId") Long analysisId);

    // Recherche par analyse associée (inclus les tests sans analyse associée)
    @Query("SELECT t FROM TestAnalysis t WHERE t.analysis.id = :analysisId OR t.analysis IS NULL")
    List<TestAnalysis> findByAnalysisIdIncludingNull(@Param("analysisId") Long analysisId);

    // Recherche des tests sans analyse associée
    @Query("SELECT t FROM TestAnalysis t WHERE t.analysis IS NULL")
    List<TestAnalysis> findByAnalysisIsNull();
}
