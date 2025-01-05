package com.example.user_service;

import com.example.user_service.entities.User;
import com.example.user_service.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

	@Bean
	public CommandLineRunner insertUsers(UserRepository userRepository) {
		return args -> {
			// Insertion de quelques utilisateurs fictifs pour éviter la liste vide
			if (userRepository.count() == 0) {
				userRepository.save(new User(
						"ahmed.benali@example.com",
						"Ahmed Benali",
						"password123",
						"Médecin",
						"0612345678",  // Numéro marocain
						"signature1",
						"ROLE_USER",
						1L,
						null));

				userRepository.save(new User(
						"mariam.ouadoud@example.com",
						"Mariam Ouadoud",
						"password123",
						"Ingénieur",
						"0654321098",  // Numéro marocain
						"signature2",
						"ROLE_ADMIN",
						2L,
						null));

				userRepository.save(new User(
						"youssef.elhassani@example.com",
						"Youssef Elhassani",
						"password123",
						"Enseignant",
						"0678987654",  // Numéro marocain
						"signature3",
						"ROLE_USER",
						3L,
						null));

				userRepository.save(new User(
						"sanaa.rahmani@example.com",
						"Sanaa Rahmani",
						"password123",
						"Avocat",
						"0609876543",  // Numéro marocain
						"signature4",
						"ROLE_USER",
						4L,
						null));

				userRepository.save(new User(
						"yassir.boujema@example.com",
						"Yassir Boujema",
						"password123",
						"Architecte",
						"0687561234",  // Numéro marocain
						"signature5",
						"ROLE_USER",
						5L,
						null));
			}
		};
	}
}
