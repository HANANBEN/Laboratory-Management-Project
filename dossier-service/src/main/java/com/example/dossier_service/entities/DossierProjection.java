package com.example.dossier_service.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "extendedDossier", types = Dossier.class)
public interface DossierProjection {

    Long getNumDossier(); // Assuming numDossier is present in Dossier

    Long getFkEmailUtilisateur(); // Foreign key for User (email)

    @Value("#{target.fkEmailUtilisateur != null ? @UserClientService.getUserById(target.fkEmailUtilisateur) : null}")
    Object getUserDetails(); // Uses Feign Client to fetch User details

    LocalDate getDate(); // Date of the dossier

    @Value("#{target.patient != null ? target.patient : null}")
    Patient getPatientDetails(); // Patient details (assuming it's a reference to Patient entity)
}
