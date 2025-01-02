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
public class ContactLaboratory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Long fkIdLaboratory; // Foreign Key vers Laboratoire
    @Transient
    private Laboratory laboratory;

    @Column(nullable = true)
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

    public Long getFkIdLaboratory() {
        return fkIdLaboratory;
    }

    public Long getFkIdAdress() {
        return fkIdAdress;
    }

    public String getNumTel() {
        return numTel;
    }

    public String getFax() {
        return fax;
    }

    public String getEmail() {
        return email;
    }

    public Laboratory getLaboratory() {
        return laboratory;
    }

    public Adress getAdress() {
        return adress;
    }
    public void setId(Long id) { this.id = id; }
    public void setFkIdLaboratory(Long fkIdLaboratory) { this.fkIdLaboratory = fkIdLaboratory; }
    public void setFkIdAdress(Long fkIdAdress) { this.fkIdAdress = fkIdAdress; }
    public void setNumTel(String numTel) { this.numTel = numTel; }
    public void setFax(String fax) { this.fax = fax; }
    public void setEmail(String email) { this.email = email; }
    public void setLaboratory(Laboratory laboratory) { this.laboratory = laboratory; }
    public void setAdress(Adress adress) { this.adress = adress; }
}
