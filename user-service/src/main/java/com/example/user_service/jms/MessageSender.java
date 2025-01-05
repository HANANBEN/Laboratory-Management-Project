package com.example.user_service.jms;

import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageSender {
    private final JmsTemplate jmsTemplate;

    public MessageSender(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    public void sendEmailMessage(String email, String subject, String body) {
        // Ajout de la phrase de sécurité au corps de l'email
        String fullBody = body + "\n\n" +
                "⚠️ Do not share this code with anyone. If you did not initiate this request, " +
                "please ignore this email.\n\n" +
                "Thank you,\nFabenLab Services.";


        // Création du message avec le champ "fromName"
        String emailMessage = "email=" + email + ",subject=" + subject + ",body=" + fullBody + ",fromName=FabenLab Services";

        // Envoi du message à la file d'attente
        jmsTemplate.convertAndSend("email-queue", emailMessage);
    }
}
