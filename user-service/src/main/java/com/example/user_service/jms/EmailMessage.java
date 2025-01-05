package com.example.user_service.jms;

import java.io.Serializable;

public class EmailMessage implements Serializable {
    private static final long serialVersionUID = 1L; // Ajout d'un serialVersionUID
    private String email;
    private String subject;
    private String body;

    public EmailMessage(String email, String subject, String body) {
        this.email = email;
        this.subject = subject;
        this.body = body;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
