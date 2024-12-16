package com.example.dossier_service.entities;

import com.example.dossier_service.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "dossier")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
