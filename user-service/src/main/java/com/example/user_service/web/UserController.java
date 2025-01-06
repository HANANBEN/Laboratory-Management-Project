package com.example.user_service.web;

import com.example.user_service.jms.MessageSender;
import com.example.user_service.service.ResetCodeService;
import com.example.user_service.repositories.UserRepository;
import com.example.user_service.entities.User;
import com.example.user_service.util.JWTUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;
    private final MessageSender messageSender;
    private final ResetCodeService resetCodeService;
    private final JWTUtil jwtUtil;

    @Autowired
    public UserController(UserRepository userRepository, MessageSender messageSender, ResetCodeService resetCodeService, JWTUtil jwtUtil) {
        this.userRepository = userRepository;
        this.messageSender = messageSender;
        this.resetCodeService = resetCodeService;
        this.jwtUtil = jwtUtil;
    }

    // Validation de l'ancien mot de passe
    @PostMapping("/validate-password")
    public ResponseEntity<?> validateOldPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String oldPassword = request.get("oldPassword");
        logger.info("Validating old password for email: {}", email);

        if (email == null || oldPassword == null) {
            logger.warn("Email or old password is missing");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email and old password are required"));
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            logger.warn("User not found with email: {}", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
        }

        if (!user.getPassword().equals(oldPassword)) {
            logger.warn("Old password incorrect for email: {}", email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Old password is incorrect"));
        }

        logger.info("Old password validated successfully for email: {}", email);
        return ResponseEntity.ok(Map.of("message", "Password is valid"));
    }

    // Envoi d'un email de récupération de mot de passe
    @PostMapping("/recover-password")
    public ResponseEntity<?> recoverPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        logger.info("Password recovery initiated for email: {}", email);

        if (email == null || email.isEmpty()) {
            logger.warn("Recover password failed: Email is missing");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email is required"));
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            logger.warn("No user found with email: {}", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User with this email does not exist"));
        }

        SecureRandom random = new SecureRandom();
        int verificationCode = 100000 + random.nextInt(900000);

        resetCodeService.saveResetCode(email, String.valueOf(verificationCode));
        logger.info("Generated verification code for email: {}", email);

        String subject = "Password Recovery Code";
        String body = "Your password recovery code is: " + verificationCode +
                ". This code is valid for 10 minutes.";

        try {
            messageSender.sendEmailMessage(email, subject, body);
            logger.info("Password recovery email sent successfully to: {}", email);
        } catch (Exception e) {
            logger.error("Failed to send email to: {}. Error: {}", email, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to send email"));
        }

        return ResponseEntity.ok(Map.of("message", "Password recovery email sent successfully"));
    }

    @PostMapping("/validate-reset-code")
    public ResponseEntity<?> validateResetCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String resetCode = request.get("resetCode");
        String newPassword = request.get("newPassword");

        if (email == null || resetCode == null || newPassword == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email, reset code, and new password are required"));
        }

        boolean isValid = resetCodeService.isResetCodeValid(email, resetCode);
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid or expired reset code"));
        }

        resetCodeService.updatePassword(email, newPassword);
        resetCodeService.invalidateCode(email);
        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: {}", loginRequest.getEmail());

        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            logger.warn("Invalid login attempt for email: {}", loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        // Générer un token JWT
        org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );

        String token = jwtUtil.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token); // Ajouter le token dans la réponse
        response.put("role", user.getRole());
        response.put("email", user.getEmail());
        response.put("nomComplet", user.getNomComplet());
        response.put("numTel", user.getNumTel());

        logger.info("Login successful for email: {}", user.getEmail());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        logger.info("Updating user with email: {}", updatedUser.getEmail());

        User existingUser = userRepository.findByEmail(updatedUser.getEmail());
        if (existingUser == null) {
            logger.warn("Update failed: No user found with email: {}", updatedUser.getEmail());
            return ResponseEntity.notFound().build();
        }

        existingUser.setNomComplet(updatedUser.getNomComplet());
        existingUser.setNumTel(updatedUser.getNumTel());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getPassword());
        }

        User savedUser = userRepository.save(existingUser);
        logger.info("User updated successfully for email: {}", savedUser.getEmail());
        return ResponseEntity.ok(savedUser);
    }
}
