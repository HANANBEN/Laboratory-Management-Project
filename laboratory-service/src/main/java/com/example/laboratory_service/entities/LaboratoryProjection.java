package com.example.laboratory_service.entities;


import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name="fullLaboratory" , types=Laboratory.class)
public interface LaboratoryProjection {

    Long getId();

    String getNom();

    String getLogo();

    String getNrc();

    boolean isActive();

    Date getDateActivation();
}
