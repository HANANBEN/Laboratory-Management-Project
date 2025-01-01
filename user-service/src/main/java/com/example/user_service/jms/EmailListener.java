package com.example.user_service.jms;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class EmailListener {

    @JmsListener(destination = "email-queue")
    public void onEmailMessage(String emailMessage) {
        try {
            // Décoder le message (extraction de l'email, sujet, et corps du message)
            String[] parts = emailMessage.split(",");
            String email = parts[0].split("=")[1];
            String subject = parts[1].split("=")[1];
            String body = parts[2].split("=")[1];

            // Configuration pour SMTP (Gmail, par exemple)
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.port", "587");

            // Authentification
            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("fakriaya2002@gmail.com", "dcva tuov vjfp wrju");
                }
            });

            // Préparer le message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("fakriaya2002@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse(email));
            message.setSubject(subject);
            message.setText(body);

            // Envoyer le message
            Transport.send(message);

            System.out.println("Email sent successfully to " + email);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
