package com.example.examen_service.services;

import com.example.examen_service.model.Dossier;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@FeignClient(name = "dossier-service") // Remplacez "dossier-service" par le nom réel de votre service Dossier
public interface DossierExamenService {

    @GetMapping("/dossiers/{numDossier}?projection=extendedDossier")
    Dossier getDossierByNumDossier(@PathVariable("numDossier") Long numDossier);

    @GetMapping("/dossiers?projection=extendedDossier")
    PagedModel<Dossier> getAllDossiers();
}
