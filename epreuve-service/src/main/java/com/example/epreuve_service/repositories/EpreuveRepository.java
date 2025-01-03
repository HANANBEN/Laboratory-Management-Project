package com.example.epreuve_service.repositories;

import com.example.epreuve_service.entities.Epreuve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EpreuveRepository extends JpaRepository<Epreuve, Long> {
}

