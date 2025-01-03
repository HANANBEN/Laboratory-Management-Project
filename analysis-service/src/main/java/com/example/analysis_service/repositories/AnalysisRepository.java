package com.example.analysis_service.repositories;

import com.example.analysis_service.entities.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "analyses",
        path = "analyses"
)
@CrossOrigin(origins = "http://localhost:5678")
public interface AnalysisRepository extends JpaRepository<Analysis, Long> {

    // Recherche par nom d'analyse
    @Query("SELECT a FROM Analysis a WHERE a.nom = :nom")
    List<Analysis> findByNom(@Param("nom") String nom);

    // Recherche par description d'analyse
    @Query("SELECT a FROM Analysis a WHERE a.description = :description")
    List<Analysis> findByDescription(@Param("description") String description);

    // Recherche par fkLaboratoireId
    @Query("SELECT a FROM Analysis a WHERE a.fkLaboratoireId = :laboratoireId")
    List<Analysis> findByFkLaboratoireId(@Param("laboratoireId") Long laboratoireId);

    // Recherche par nom et description d'analyse
    @Query("SELECT a FROM Analysis a WHERE a.nom = :nom AND a.description = :description")
    List<Analysis> findByNomAndDescription(@Param("nom") String nom, @Param("description") String description);

    // Recherche par fkLaboratoireId, incluant les valeurs NULL
    @Query("SELECT a FROM Analysis a WHERE a.fkLaboratoireId = :laboratoireId OR a.fkLaboratoireId IS NULL")
    List<Analysis> findByFkLaboratoireIdIncludingNull(@Param("laboratoireId") Long laboratoireId);

    // Recherche par fkLaboratoireId NULL uniquement
    @Query("SELECT a FROM Analysis a WHERE a.fkLaboratoireId IS NULL")
    List<Analysis> findByFkLaboratoireIdIsNull();
}
