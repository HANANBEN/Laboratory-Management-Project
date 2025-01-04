package com.example.epreuve_service;

import com.example.epreuve_service.entities.Epreuve;
import com.example.epreuve_service.model.Analysis;
import com.example.epreuve_service.repositories.EpreuveRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EpreuveServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpreuveServiceApplication.class, args);
	}

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
		};
	}
}
