package com.example.user_service.web;


import com.example.user_service.entities.User;
import com.example.user_service.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    // Récupérer tous les utilisateurs
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Récupérer un utilisateur par email
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findById(email);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Ajouter un utilisateur
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User createdUser = userRepository.save(user);
        return ResponseEntity.ok(createdUser);
    }

    // Mettre à jour un utilisateur
    @PutMapping("/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User userDetails) {
        Optional<User> existingUser = userRepository.findById(email);
        if (existingUser.isPresent()) {
            userDetails.setEmail(email); // Assurez-vous que l'email ne change pas
            User updatedUser = userRepository.save(userDetails);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un utilisateur
    @DeleteMapping("/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        if (userRepository.existsById(email)) {
            userRepository.deleteById(email);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
