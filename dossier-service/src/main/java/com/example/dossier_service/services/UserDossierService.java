package com.example.dossier_service.services;

import com.example.dossier_service.entities.Dossier;
import com.example.dossier_service.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@Service
@FeignClient(name="user-service") // Changer ici le nom du service à user-service
public interface UserDossierService {

    @GetMapping("/dossiers/{numDossier}?projection=extendedDossier")
    Dossier getDossierByNumDossier(@PathVariable("numDossier") Long numDossier);

    @GetMapping("/dossiers?projection=extendedDossier")
    PagedModel<Dossier> getAllDossiers();

    @GetMapping("/users/{id}?projection=fullUser")
    User getUserById(@PathVariable("id") Long id);

    @GetMapping("/users?projection=fullUser")
    PagedModel<User> getAllUsers();
}
