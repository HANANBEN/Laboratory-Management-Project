package com.example.epreuve_service;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients // Enable Feign Clients
public class EpreuveServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpreuveServiceApplication.class, args);
	}


	/*@Bean
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

		}
	}*/
}
