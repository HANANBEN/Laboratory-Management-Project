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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long fkIdLaboratory() {
        return fkIdLaboratory;
    }

    public void setFkIdLaboratory(Long fkIdLaboratory) {
        this.fkIdLaboratory = fkIdLaboratory;
    }

    public Laboratory laboratory() {
        return laboratory;
    }

    public void setLaboratory(Laboratory laboratory) {
        this.laboratory = laboratory;
    }

    public Long fkIdAdress() {
        return fkIdAdress;
    }

    public void setFkIdAdress(Long fkIdAdress) {
        this.fkIdAdress = fkIdAdress;
    }

    public Adress adress() {
        return adress;
    }

    public void setAdress(Adress adress) {
        this.adress = adress;
    }

    public String numTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String fax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String email() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
