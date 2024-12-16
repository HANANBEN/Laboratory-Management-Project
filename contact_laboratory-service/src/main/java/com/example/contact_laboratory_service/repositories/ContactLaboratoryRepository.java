package com.example.contact_laboratory_service.repositories;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ContactLaboratoryRepository extends JpaRepository<ContactLaboratory , Long> {

}
