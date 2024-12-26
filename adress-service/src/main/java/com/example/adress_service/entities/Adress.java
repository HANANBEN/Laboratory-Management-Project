package com.example.adress_service.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "adresse")
@Data // Lombok pour générer automatiquement getters, setters, toString, equals et hashcode
public class Adress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique de l'adresse

    private int numVoie;    // Numéro de la voie (rue, avenue)
    private String nomVoie;    // Nom de la voie
    private Long codePostal; // Code postal de la localité
    private String ville;      // Ville où se situe l'adresse
    private String commune;    // Commune associée à l'adresse
    public Adress (){}
    public Adress(Long id, int numVoie, String nomVoie, Long codePostal, String ville, String commune) {
        this.id = id;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.codePostal = codePostal;
        this.ville = ville;
        this.commune = commune;
    }

}

