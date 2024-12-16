package com.example.user_service.entities;


import org.springframework.data.rest.core.config.Projection;

@Projection(name="fullUser" , types=User.class)
public interface UserProjection {
    // Getter for email
    public String getEmail();

    // Getter for nomComplet
    public String getNomComplet();

    // Getter for profession
    public String getProfession();

    // Getter for numTel
    public String getNumTel();

    // Getter for signature
    public String getSignature();

    // Getter for role
    public String getRole();

    // Getter for laboratoireId
    public Long getLaboratoireId();

}
