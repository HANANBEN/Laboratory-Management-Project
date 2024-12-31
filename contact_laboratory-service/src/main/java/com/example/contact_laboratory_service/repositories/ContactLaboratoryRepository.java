package com.example.contact_laboratory_service.repositories;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import com.example.contact_laboratory_service.entities.ContactLaboratoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(
        collectionResourceRel = "contactLaboratories",
        path = "contactLaboratories"
)
@CrossOrigin(origins = "http://localhost:4200")
public interface ContactLaboratoryRepository extends JpaRepository<ContactLaboratory, Long> {


    @Query("SELECT c FROM ContactLaboratory c WHERE c.fkIdLaboratory = :laboratoryId")
    List<ContactLaboratory> findByFkIdLaboratory(@Param("laboratoryId") Long laboratoryId);


    @Query("SELECT c FROM ContactLaboratory c WHERE c.fkIdLaboratory = :laboratoryId OR c.fkIdLaboratory IS NULL")
    List<ContactLaboratory> findByFkIdLaboratoryIncludingNull(@Param("laboratoryId") Long laboratoryId);

    @Query("SELECT c FROM ContactLaboratory c WHERE c.fkIdLaboratory IS NULL")
    List<ContactLaboratory> findByFkIdLaboratoryIsNull();

}

