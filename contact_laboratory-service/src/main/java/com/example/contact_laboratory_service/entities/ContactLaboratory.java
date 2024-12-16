package com.example.contact_laboratory_service.entities;


import com.example.contact_laboratory_service.model.Adress;
import com.example.contact_laboratory_service.model.Laboratory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contact_laboratoire")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactLaboratory{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long fkIdLaboratory; // Foreign Key vers Laboratoire
    @Transient
    private Laboratory laboratory;

    @Column(nullable = false)
    private Long fkIdAdress; // Foreign Key vers Adresse

    @Transient
    private Adress adress;

    @Column(nullable = false)
    private String numTel;

    private String fax;

    @Column(nullable = false)
    private String email;

}
