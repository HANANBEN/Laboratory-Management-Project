package com.example.dossier_service.repositories;

import com.example.dossier_service.entities.Dossier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "dossiers",
        path = "dossiers"
)
@CrossOrigin(origins = "http://localhost:8084")
public interface DossierRepository extends JpaRepository<Dossier, Long> {

    // Recherche par numDossier
    @Query("SELECT d FROM Dossier d WHERE d.numDossier = :numDossier")
    List<Dossier> findByNumDossier(@Param("numDossier") Long numDossier);

    // Recherche par fkEmailUtilisateur (Utilisateur)
    @Query("SELECT d FROM Dossier d WHERE d.fkEmailUtilisateur = :fkEmailUtilisateur")
    List<Dossier> findByFkEmailUtilisateur(@Param("fkEmailUtilisateur") Long fkEmailUtilisateur);

    // Recherche par date du dossier
    @Query("SELECT d FROM Dossier d WHERE d.date = :date")
    List<Dossier> findByDate(@Param("date") LocalDate date);

    // Recherche par numDossier et fkEmailUtilisateur
    @Query("SELECT d FROM Dossier d WHERE d.numDossier = :numDossier AND d.fkEmailUtilisateur = :fkEmailUtilisateur")
    List<Dossier> findByNumDossierAndFkEmailUtilisateur(@Param("numDossier") Long numDossier, @Param("fkEmailUtilisateur") Long fkEmailUtilisateur);

    // Recherche par fkEmailUtilisateur, incluant les valeurs NULL
    @Query("SELECT d FROM Dossier d WHERE d.fkEmailUtilisateur = :fkEmailUtilisateur OR d.fkEmailUtilisateur IS NULL")
    List<Dossier> findByFkEmailUtilisateurIncludingNull(@Param("fkEmailUtilisateur") Long fkEmailUtilisateur);

    // Recherche par fkEmailUtilisateur NULL uniquement
    @Query("SELECT d FROM Dossier d WHERE d.fkEmailUtilisateur IS NULL")
    List<Dossier> findByFkEmailUtilisateurIsNull();

    // Recherche par Patient (par exemple, selon un identifiant patient spécifique)
    @Query("SELECT d FROM Dossier d WHERE d.patient.id = :patientId")
    List<Dossier> findByPatientId(@Param("patientId") Long patientId);

    // Recherche par fkEmailUtilisateur et PatientId
    @Query("SELECT d FROM Dossier d WHERE d.fkEmailUtilisateur = :fkEmailUtilisateur AND d.patient.id = :patientId")
    List<Dossier> findByFkEmailUtilisateurAndPatientId(@Param("fkEmailUtilisateur") Long fkEmailUtilisateur, @Param("patientId") Long patientId);
}
