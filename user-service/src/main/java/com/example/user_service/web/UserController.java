package com.example.user_service.web;

import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401)
                    .header("Content-Type", "application/json")
                    .body(Map.of("error", "Invalid email or password"));
        }

        Map<String, String> response = new HashMap<>();
        response.put("role", user.getRole());
        System.out.println("Response JSON: " + response);


        return ResponseEntity.ok()
                .header("Content-Type", "application/json")
                .body(response);
    }

}