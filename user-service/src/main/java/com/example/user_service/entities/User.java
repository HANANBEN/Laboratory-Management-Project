package com.example.user_service.entities;

import com.example.user_service.model.Laboratory;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.CommandLineRunner;

@Entity
@Table(name = "utilisateur")
public class User {

    @Id
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "nom_complet", nullable = false)
    private String nomComplet;

    @Column(name="mode_de_passe")
    private String password;

    @Column(name = "profession")
    private String profession;

    @Column(name = "num_tel")
    private String numTel;

    @Column(name = "signature")
    private String signature;

    @Column(name = "role")
    private String role;

    @Column(name = "fk_id_laboratoire")
    private Long laboratoireId; // Référence à l'ID du laboratoire


    @Transient
    private Laboratory laboratory;

    public User() {

    }

    public User(String email, String nomComplet, String password, String profession, String numTel, String signature, String role, Long laboratoireId, Laboratory laboratory) {
        this.email = email;
        this.nomComplet = nomComplet;
        this.password = password;
        this.profession = profession;
        this.numTel = numTel;
        this.signature = signature;
        this.role = role;
        this.laboratoireId = laboratoireId;
        this.laboratory = laboratory;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getLaboratoireId() {
        return laboratoireId;
    }

    public void setLaboratoireId(Long laboratoireId) {
        this.laboratoireId = laboratoireId;
    }

    public Laboratory getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(Laboratory laboratory) {
        this.laboratory = laboratory;
    }
}
