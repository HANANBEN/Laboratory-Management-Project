package com.example.examen_service.repositories;

import com.example.examen_service.entities.Examen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "examens",
        path = "examens"
)
@CrossOrigin(origins = "http://localhost:8070")
public interface ExamenRepository extends JpaRepository<Examen, Long> {

    // Recherche par résultat
    @Query("SELECT e FROM Examen e WHERE e.resultat = :resultat")
    List<Examen> findByResultat(@Param("resultat") String resultat);

    // Recherche par fkNumDossier
    @Query("SELECT e FROM Examen e WHERE e.fkNumDossier = :numDossier")
    List<Examen> findByFkNumDossier(@Param("numDossier") Long numDossier);

    // Recherche par fkIdEpeuve
    @Query("SELECT e FROM Examen e WHERE e.fkIdEpeuve = :idEpeuve")
    List<Examen> findByFkIdEpeuve(@Param("idEpeuve") Long idEpeuve);

    // Recherche par fkIdTestAnalysis
    @Query("SELECT e FROM Examen e WHERE e.fkIdTestAnalysis = :idTestAnalysis")
    List<Examen> findByFkIdTestAnalysis(@Param("idTestAnalysis") Long idTestAnalysis);

    // Recherche par combinaison de fkNumDossier et résultat
    @Query("SELECT e FROM Examen e WHERE e.fkNumDossier = :numDossier AND e.resultat = :resultat")
    List<Examen> findByFkNumDossierAndResultat(@Param("numDossier") Long numDossier, @Param("resultat") String resultat);

    // Recherche par fkNumDossier avec valeurs NULL
    @Query("SELECT e FROM Examen e WHERE e.fkNumDossier = :numDossier OR e.fkNumDossier IS NULL")
    List<Examen> findByFkNumDossierIncludingNull(@Param("numDossier") Long numDossier);

    // Recherche par fkIdEpeuve avec valeurs NULL
    @Query("SELECT e FROM Examen e WHERE e.fkIdEpeuve IS NULL")
    List<Examen> findByFkIdEpeuveIsNull();
}
