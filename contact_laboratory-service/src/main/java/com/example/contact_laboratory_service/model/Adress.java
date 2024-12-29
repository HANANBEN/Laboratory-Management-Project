package com.example.contact_laboratory_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class Adress {

    private Long id;
    // Identifiant unique de l'adresse
    private int numVoie;   // Numéro de la voie (rue, avenue)
    private String nomVoie;   // Nom de la voie
    private Long codePostal; // Code postal de la localité
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int numVoie() {
        return numVoie;
    }

    public void setNumVoie(int numVoie) {
        this.numVoie = numVoie;
    }

    public String nomVoie() {
        return nomVoie;
    }

    public void setNomVoie(String nomVoie) {
        this.nomVoie = nomVoie;
    }

    public Long codePostal() {
        return codePostal;
    }

    public void setCodePostal(Long codePostal) {
        this.codePostal = codePostal;
    }

    public String ville() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String commune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public Adress(Long id, int numVoie, String nomVoie, Long codePostal, String ville, String commune) {
        this.id = id;
        this.numVoie = numVoie;
        this.nomVoie = nomVoie;
        this.codePostal = codePostal;
        this.ville = ville;
        this.commune = commune;
    }

    public Adress() {
    }
}
