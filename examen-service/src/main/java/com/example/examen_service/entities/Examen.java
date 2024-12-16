package com.example.examen_service.entities;



import com.example.examen_service.model.Dossier;
import com.example.examen_service.model.Epreuve;
import com.example.examen_service.model.TestAnalysis;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "examen")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "fkNumDossier", nullable = false)
    private Long fkNumDossier;

    @Transient
    private Dossier dossier;

    @Column(name = "fkIdEpeuve", nullable = false)
    private Long fkIdEpeuve;

    @Transient
    private Epreuve epreuve;


    @Column(name = "fkIdTestAnalysis", nullable = false)
    private Long fkIdTestAnalysis;


    @Transient
    private TestAnalysis testAnalysis;

    @Column(name = "resultat")
    private String resultat;


}
