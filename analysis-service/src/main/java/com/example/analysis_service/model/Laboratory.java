package com.example.analysis_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Laboratory {

    private Long id;
    private String nom;
    private String logo;
    private String nrc;
    private boolean active;

    private Date dateActivation;




}
