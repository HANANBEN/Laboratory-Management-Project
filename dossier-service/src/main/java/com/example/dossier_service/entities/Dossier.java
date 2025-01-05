package com.example.dossier_service.entities;

import com.example.dossier_service.model.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "dossier")
public class Dossier {

    @Id
    @Column(name = "numDossier")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numDossier;

    @ManyToOne
    @JoinColumn(name = "fkIdPatient", nullable = false)
    private Patient patient;

    private Long fkEmailUtilisateur;

    @Transient
    private User user;

    private LocalDate date;

    // Constructor without parameters
    public Dossier() {
    }

    // Constructor with all parameters
    public Dossier(Long numDossier, Patient patient, Long fkEmailUtilisateur, User user, LocalDate date) {
        this.numDossier = numDossier;
        this.patient = patient;
        this.fkEmailUtilisateur = fkEmailUtilisateur;
        this.user = user;
        this.date = date;
    }

    // Getters and Setters
    public Long getNumDossier() {
        return numDossier;
    }

    public void setNumDossier(Long numDossier) {
        this.numDossier = numDossier;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Long getFkEmailUtilisateur() {
        return fkEmailUtilisateur;
    }

    public void setFkEmailUtilisateur(Long fkEmailUtilisateur) {
        this.fkEmailUtilisateur = fkEmailUtilisateur;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
