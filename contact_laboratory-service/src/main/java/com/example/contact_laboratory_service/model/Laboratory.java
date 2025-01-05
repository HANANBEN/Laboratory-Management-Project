package com.example.contact_laboratory_service.model;

import java.util.Date;
    public class Laboratory {

        private Long id;
        private String nom;
        private String logo;
        private String nrc;
        private boolean active;

        private Date dateActivation;

        public Laboratory() {
        }

        public Laboratory(String nom, String logo, String nrc, boolean active, Date dateActivation) {
            this.nom = nom;
            this.logo = logo;
            this.nrc = nrc;
            this.active = active;
            this.dateActivation = dateActivation;
        }


        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getNom() {
            return nom;
        }

        public void setNom(String nom) {
            this.nom = nom;
        }

        public String getLogo() {
            return logo;
        }

        public void setLogo(String logo) {
            this.logo = logo;
        }

        public String getNrc() {
            return nrc;
        }

        public void setNrc(String nrc) {
            this.nrc = nrc;
        }

        public boolean getActive() {
            return active;
        }

        public void setActive(boolean active) {
            this.active = active;
        }

        public Date getDateActivation() {
            return dateActivation;
        }

        public void setDateActivation(Date dateActivation) {
            this.dateActivation = dateActivation;
        }
    }