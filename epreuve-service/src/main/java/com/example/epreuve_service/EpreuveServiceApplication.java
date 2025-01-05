package com.example.epreuve_service;

import com.example.epreuve_service.entities.Epreuve;
import com.example.epreuve_service.model.Analysis;
import com.example.epreuve_service.repositories.EpreuveRepository;
<<<<<<< HEAD
import com.example.epreuve_service.services.AnalysisClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Random;
=======
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
>>>>>>> 62175538e4ab8441cec4582bd65be791bd502657

@SpringBootApplication
@EnableFeignClients // Enable Feign Clients
public class EpreuveServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpreuveServiceApplication.class, args);
	}

<<<<<<< HEAD

	@Bean
	CommandLineRunner start(EpreuveRepository epreuveRepository, AnalysisClientService analysisClientService) {
		return args -> {
			// Fetch the list of analyses from the analysis-service using the Feign client
			List<Analysis> analyses = analysisClientService.listAllAnalyses().getBody();

			if (analyses != null && !analyses.isEmpty()) {
				// Random instance to simulate FK assignment
				Random random = new Random();

				// Iterate through the analyses and create Epreuve entries
				for (int i = 0; i < 7; i++) {
					// Select a random analysis to use its ID
					Analysis randomAnalysis = analyses.get(random.nextInt(analyses.size()));

					// Create and populate the Epreuve entity
					Epreuve epreuve = new Epreuve();
					epreuve.setFkIdAnalyse(randomAnalysis.getId());
					epreuve.setNom(randomAnalysis.getNom() + " Epreuve");

					// Save the created Epreuve to the repository
					epreuveRepository.save(epreuve);
				}
			}

			// Log all saved Epreuves
			epreuveRepository.findAll().forEach(System.out::println);
=======
	@Bean
	public CommandLineRunner insertEpreuves(EpreuveRepository epreuveRepository) {
		return args -> {
			// Insertion de quelques épreuves fictives pour éviter la liste vide
			if (epreuveRepository.count() == 0) {
				for (int i = 1; i <= 10; i++) {
					// Création d'une analyse fictive associée
					Analysis analysis = new Analysis();
					analysis.setId((long) i);
					analysis.setFkIdLaboratoire((long) (i % 3 + 1)); // Associe aléatoirement des laboratoires
					analysis.setNom("Analysis " + i);
					analysis.setDescription("Description for Analysis " + i);

					// Création et sauvegarde d'une épreuve
					Epreuve epreuve = new Epreuve();
					epreuve.setFkIdAnalyse(analysis.getId());
					epreuve.setNom("Epreuve " + i);
					epreuve.setAnalysis(analysis);

					epreuveRepository.save(epreuve);
				}
			}
>>>>>>> 62175538e4ab8441cec4582bd65be791bd502657
		};
	}
}
