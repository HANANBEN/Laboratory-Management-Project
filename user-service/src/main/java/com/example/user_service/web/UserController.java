package com.example.user_service.web;

import com.example.user_service.jms.MessageSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.user_service.repositories.UserRepository;
import com.example.user_service.entities.User;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final MessageSender messageSender;


    @Autowired
    public UserController(UserRepository userRepository, MessageSender messageSender) {
        this.userRepository = userRepository;
        this.messageSender = messageSender;
    }

    // Validation de l'ancien mot de passe
    @PostMapping("/validate-password")
    public ResponseEntity<?> validateOldPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String oldPassword = request.get("oldPassword");

        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        if (!user.getPassword().equals(oldPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Old password is incorrect"));
        }

        return ResponseEntity.ok(Map.of("message", "Password is valid"));
    }


    // Envoi d'un email de récupération de mot de passe
    @PostMapping("/recover-password")
    public ResponseEntity<?> recoverPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Vérifiez si l'utilisateur existe
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User with this email does not exist"));
        }

        // Génération d'un code aléatoire
        int verificationCode = (int) (Math.random() * 900000) + 100000; // Code à 6 chiffres

        // Contenu de l'email
        String subject = "Password Recovery Code";
        String body = "Your password recovery code is: " + verificationCode +
                ". Please use this code to reset your password. This code is valid for 15 minutes.";

        // Envoi de l'email
        messageSender.sendEmailMessage(email, subject, body);

        // Retourner une réponse contenant le code pour le frontend (utile pour du dev/test local)
        return ResponseEntity.ok(Map.of(
                "message", "Password recovery email sent successfully",
                "verificationCode", verificationCode // Supprimez cela en prod pour éviter l'exposition
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        Map<String, String> response = new HashMap<>();
        response.put("role", user.getRole());
        response.put("email", user.getEmail());
        response.put("nomComplet", user.getNomComplet());
        response.put("numTel",user.getNumTel());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        User existingUser = userRepository.findByEmail(updatedUser.getEmail());
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        existingUser.setNomComplet(updatedUser.getNomComplet());
        existingUser.setNumTel(updatedUser.getNumTel());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getPassword());
        }

        User savedUser = userRepository.save(existingUser);
        return ResponseEntity.ok(savedUser);
    }
}
