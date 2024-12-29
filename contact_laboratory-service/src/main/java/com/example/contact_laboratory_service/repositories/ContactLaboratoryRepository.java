package com.example.contact_laboratory_service.repositories;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import com.example.contact_laboratory_service.entities.ContactLaboratoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(excerptProjection = ContactLaboratoryProjection.class,
        collectionResourceRel = "contactLaboratories",
        path = "contactLaboratories")
@CrossOrigin(origins = "http://localhost:4200")
public interface ContactLaboratoryRepository extends JpaRepository<ContactLaboratory, Long> {

    @RestResource(path = "byLaboratoryId")
    List<ContactLaboratoryProjection> findByFkIdLaboratory(@Param("laboratoryId") Long laboratoryId);
}

