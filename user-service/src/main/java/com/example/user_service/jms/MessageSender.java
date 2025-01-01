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
        // Créer un message JSON ou une chaîne pour l'email
        String emailMessage = "email=" + email + ",subject=" + subject + ",body=" + body;

        // Envoyer le message sous forme de texte
        jmsTemplate.convertAndSend("email-queue", emailMessage);
    }
}
