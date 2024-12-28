package com.example.adress_service.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "fullAdress" , types = Adress.class)
public interface AdressProjection {
     Long getId();
     String getNomVoie() ;
     Long getCodePostal();
     String getVille();
     String getCommune();
}
