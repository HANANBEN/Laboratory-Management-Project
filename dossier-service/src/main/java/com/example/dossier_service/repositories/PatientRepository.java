package com.example.dossier_service.repositories;

import com.example.dossier_service.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "patients",
        path = "patients"
)
@CrossOrigin(origins = "http://localhost:8084")
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Recherche par ID du patient, renommée pour éviter le conflit avec CrudRepository
    @Query("SELECT p FROM Patient p WHERE p.id = :id")
    List<Patient> findByPatientId(@Param("id") Long id);

    // Recherche par nom complet du patient
    @Query("SELECT p FROM Patient p WHERE p.nomComplet = :nomComplet")
    List<Patient> findByNomComplet(@Param("nomComplet") String nomComplet);

    // Recherche par sexe du patient
    @Query("SELECT p FROM Patient p WHERE p.sexe = :sexe")
    List<Patient> findBySexe(@Param("sexe") String sexe);

    // Recherche par email du patient
    @Query("SELECT p FROM Patient p WHERE p.email = :email")
    List<Patient> findByEmail(@Param("email") String email);

    // Recherche par type de pièce d'identité
    @Query("SELECT p FROM Patient p WHERE p.typePieceIdentite = :typePieceIdentite")
    List<Patient> findByTypePieceIdentite(@Param("typePieceIdentite") String typePieceIdentite);

    // Recherche par numéro de pièce d'identité
    @Query("SELECT p FROM Patient p WHERE p.numPieceIdentite = :numPieceIdentite")
    List<Patient> findByNumPieceIdentite(@Param("numPieceIdentite") String numPieceIdentite);

    // Recherche par adresse
    @Query("SELECT p FROM Patient p WHERE p.adresse = :adresse")
    List<Patient> findByAdresse(@Param("adresse") String adresse);

    // Recherche par numéro de téléphone
    @Query("SELECT p FROM Patient p WHERE p.numTel = :numTel")
    List<Patient> findByNumTel(@Param("numTel") String numTel);

    // Recherche par nom complet et email du patient
    @Query("SELECT p FROM Patient p WHERE p.nomComplet = :nomComplet AND p.email = :email")
    List<Patient> findByNomCompletAndEmail(@Param("nomComplet") String nomComplet, @Param("email") String email);

    // Recherche par ID du dossier associé
    @Query("SELECT p FROM Patient p JOIN p.dossier d WHERE d.numDossier = :numDossier")
    List<Patient> findByDossierNumDossier(@Param("numDossier") Long numDossier);

    // Recherche par email du patient et dossier associé
    @Query("SELECT p FROM Patient p JOIN p.dossier d WHERE p.email = :email AND d.numDossier = :numDossier")
    List<Patient> findByEmailAndDossierNumDossier(@Param("email") String email, @Param("numDossier") Long numDossier);
}
