package com.example.user_service.web;

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

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Rechercher l'utilisateur par email
        User user = userRepository.findByEmail(loginRequest.getEmail());

        // Vérification de l'utilisateur et du mot de passe
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .header("Content-Type", "application/json")
                    .body(errorResponse);
        }

        // Création de la réponse en cas de succès
        Map<String, String> response = new HashMap<>();
        response.put("role", user.getRole());
        response.put("email", user.getEmail()); // Ajouter l'email si nécessaire
        response.put("nomComplet", user.getNomComplet()); // Ajouter le nom complet si utile
        System.out.println("Response JSON: " + response);

        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

    // Endpoint pour mettre à jour un utilisateur
    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        // Vérifiez si l'utilisateur existe
        User existingUser = userRepository.findByEmail(updatedUser.getEmail());
        if (existingUser == null) {
            return ResponseEntity.notFound().build(); // Retourne 404 si l'utilisateur n'existe pas
        }

        // Mettre à jour les champs nécessaires
        existingUser.setNomComplet(updatedUser.getNomComplet());
        existingUser.setNumTel(updatedUser.getNumTel());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getPassword());
        }

        // Sauvegarder les changements
        User savedUser = userRepository.save(existingUser);

        return ResponseEntity.ok(savedUser);
    }

}
