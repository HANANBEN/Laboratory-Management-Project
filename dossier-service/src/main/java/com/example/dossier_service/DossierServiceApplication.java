package com.example.dossier_service;

import com.example.dossier_service.entities.Dossier;
import com.example.dossier_service.entities.Patient;
import com.example.dossier_service.model.User;
import com.example.dossier_service.repositories.DossierRepository;
import com.example.dossier_service.repositories.PatientRepository;
import com.example.dossier_service.services.UserDossierService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class DossierServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DossierServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner loadDossierData(DossierRepository dossierRepository, PatientRepository patientRepository, UserDossierService userDossierService) {
		return args -> {
			// Fetch users from the external service (User service)
			List<User> users = userDossierService.getAllUsers().getContent().stream().toList();

			Random random = new Random();

			for (int i = 0; i < 20; i++) {
				// Create a new Patient instance
				Patient patient = new Patient();
				patient.setNomComplet("Patient " + i);
				patient.setDateNaissance(LocalDate.of(1990, 1, 1).plusYears(random.nextInt(50)));
				patient.setLieuDeNaissance("Place " + i);
				patient.setSexe(i % 2 == 0 ? "Male" : "Female");
				patient.setTypePieceIdentite("ID Type " + i);
				patient.setNumPieceIdentite("ID-" + i);
				patient.setAdresse("Address " + i);
				patient.setNumTel("1234567890" + i);
				patient.setEmail("patient" + i + "@example.com");
				patient.setVisiblePour("Doctor, Family");

				// Save the patient to the repository
				patientRepository.save(patient);

				// Create a new Dossier instance
				Dossier dossier = new Dossier();
				dossier.setPatient(patient);
				if (users != null && !users.isEmpty()) {
					dossier.setFkEmailUtilisateur(users.get(random.nextInt(users.size())).getId());
				} else {
					// Gérez le cas où la liste est vide ou nulle
					throw new IllegalArgumentException("La liste des utilisateurs est vide ou invalide.");
				}
				dossier.setUser(users.get(random.nextInt(users.size())));
				dossier.setDate(LocalDate.now());

				// Save the dossier to the repository
				dossierRepository.save(dossier);
			}
		};
	}
}
