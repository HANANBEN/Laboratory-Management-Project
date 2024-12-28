package com.example.adress_service.repositories;

import com.example.adress_service.entities.Adress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

public interface AdressRepository extends JpaRepository<Adress, Long> {
    Optional<Adress> findByNomVoie(String nomVoie);
    // Recherche par ville
    @RestResource(path = "by-ville", rel = "by-ville")
    List<Adress> findByVille(String ville);

    // Recherche par commune
    @RestResource(path = "by-commune", rel = "by-commune")
    List<Adress> findByCommune(String commune);

    // Recherche par ville et commune
    @RestResource(path = "by-ville-and-commune", rel = "by-ville-and-commune")
    List<Adress> findByVilleAndCommune(String ville, String commune);
}
