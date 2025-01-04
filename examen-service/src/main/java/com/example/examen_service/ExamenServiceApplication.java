package com.example.examen_service;

import com.example.examen_service.entities.Examen;
import com.example.examen_service.repositories.ExamenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Random;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class ExamenServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamenServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner loadExamenData(ExamenRepository examenRepository) {
		return args -> {
			Random random = new Random();

			for (int i = 0; i < 20; i++) {
				// Create a new Examen instance
				Examen examen = new Examen();
				examen.setResultat("Résultat " + i);

				// Assign random values (instead of fetching from other services)
				examen.setFkNumDossier((long) random.nextInt(1000));  // Simulating a Dossier ID
				examen.setFkIdEpeuve((long) random.nextInt(100));     // Simulating an Epreuve ID
				examen.setFkIdTestAnalysis((long) random.nextInt(100)); // Simulating a TestAnalysis ID

				// Assign a random value for fk_patient_id (ensure this is not null)
				examen.setFkPatientId((long) random.nextInt(100)); // Simulating a Patient ID

				// Save the examen to the repository
				examenRepository.save(examen);
			}
		};
	}
}
