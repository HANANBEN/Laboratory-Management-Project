package com.example.analysis_service.entities;

import com.example.analysis_service.model.Laboratory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Analysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fk_laboratoire_id")
    private Long fkLaboratoireId;

    @Transient
    private Laboratory laboratory;

    private String nom;

    private String description;

    @OneToMany(mappedBy = "analysis", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TestAnalysis> testAnalysis;



}