package com.example.analysis_service.repositories;

import com.example.analysis_service.entities.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {

    // Recherche par nom d'analyse
    @RestResource(path = "by-nom", rel = "by-nom")
    List<Analysis> findByNom(String nom);

    // Recherche par description d'analyse
    @RestResource(path = "by-description", rel = "by-description")
    List<Analysis> findByDescription(String description);

    // Recherche par laboratoire
    @RestResource(path = "by-laboratoire-id", rel = "by-laboratoire-id")
    List<Analysis> findByFkLaboratoireId(Long fkLaboratoireId);

    // Recherche par nom et description d'analyse
    @RestResource(path = "by-nom-and-description", rel = "by-nom-and-description")
    List<Analysis> findByNomAndDescription(String nom, String description);
}
