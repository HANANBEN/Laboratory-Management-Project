package com.example.contact_laboratory_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adress {

    private Long id;          // Identifiant unique de l'adresse
    private String numVoie;   // Numéro de la voie (rue, avenue)
    private String nomVoie;   // Nom de la voie
    private String codePostal; // Code postal de la localité
    private String ville;     // Ville où se situe l'adresse
    private String commune;   // Commune associée à l'adresse


    // Méthode toString pour affichage
    @Override
    public String toString() {
        return "Adresse{" +
                "id=" + id +
                ", numVoie='" + numVoie + '\'' +
                ", nomVoie='" + nomVoie + '\'' +
                ", codePostal='" + codePostal + '\'' +
                ", ville='" + ville + '\'' +
                ", commune='" + commune + '\'' +
                '}';
    }
}
