package com.example.user_service.entities;

import com.example.user_service.model.Laboratory;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.CommandLineRunner;

@Entity
@Table(name = "utilisateur")
@Data
@NoArgsConstructor
@AllArgsConstructor
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



}
