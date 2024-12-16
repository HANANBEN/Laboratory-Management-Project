package com.example.dossier_service.repositories;

import com.example.dossier_service.entities.Dossier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface DossierRepository  extends JpaRepository<Dossier, Long> {
}
