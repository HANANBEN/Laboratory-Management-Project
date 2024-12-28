package com.example.laboratory_service.repositories;

import com.example.laboratory_service.entities.Laboratory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;


@RepositoryRestResource
public interface LaboratoryRepository extends JpaRepository<Laboratory, Long> {
    //Recherche par nom
    @RestResource(path = "by-nom", rel = "by-nom")
    List<Laboratory> findByNomContaining(@Param("nom") String nom);


    //Recherche par statut
    @RestResource(path = "by-active", rel = "by-active")
    List<Laboratory> findByActive(@Param("active") boolean active);

    // Recherche combinée par nom et statut


    @RestResource(path = "by-nom-and-active", rel = "by-nom-and-active")
    List<Laboratory> findByNomContainingAndActive(@Param("nom") String nom, @Param("active") boolean active);

}
