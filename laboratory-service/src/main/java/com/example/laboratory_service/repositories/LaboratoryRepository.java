package com.example.laboratory_service.repositories;

import com.example.laboratory_service.entities.Laboratory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface LaboratoryRepository extends JpaRepository<Laboratory, Long> {
}
