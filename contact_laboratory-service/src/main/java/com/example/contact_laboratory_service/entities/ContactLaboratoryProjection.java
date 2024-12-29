package com.example.contact_laboratory_service.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "extendedContactLaboratory", types = ContactLaboratory.class)
public interface ContactLaboratoryProjection {

    Long getId(); // Assuming ID is present in ContactLaboratory

    Long getFkIdLaboratory(); // Foreign key for Laboratory

    Long getFkIdAdress(); // Foreign key for Adress

    @Value("#{target.fkIdLaboratory != null ? @LaboratoryClientService.getLaboratoryById(target.fkIdLaboratory) : null}")
    Object getLaboratoryDetails(); // Uses Feign Client

    @Value("#{target.fkIdAdress != null ? @adressClientService.getAdressById(target.fkIdAdress) : null}")
    Object getAdressDetails(); // Uses Feign Client
}
