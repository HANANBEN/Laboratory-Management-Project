package com.example.dossier_service.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "extendedPatient", types = Patient.class)
public interface PatientProjection {

    Long getId(); // Assuming ID is present in Patient

    String getNomComplet(); // Full name of the Patient

    LocalDate getDateNaissance(); // Date of birth

    String getLieuDeNaissance(); // Place of birth

    String getSexe(); // Gender

    String getTypePieceIdentite(); // Type of ID document

    String getNumPieceIdentite(); // ID document number

    String getAdresse(); // Address

    String getNumTel(); // Phone number

    String getEmail(); // Email address

    String getVisiblePour(); // Visibility for other entities

    @Value("#{target.dossier != null ? target.dossier : null}")
    Dossier getDossierDetails(); // Dossier details (assuming it's a reference to Dossier entity)
}
