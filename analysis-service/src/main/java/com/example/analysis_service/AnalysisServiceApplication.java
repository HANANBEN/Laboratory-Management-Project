package com.example.analysis_service;

import com.example.analysis_service.entities.Analysis;
import com.example.analysis_service.entities.TestAnalysis;
import com.example.analysis_service.model.Laboratory;
import com.example.analysis_service.repositories.AnalysisRepository;
import com.example.analysis_service.services.LaboratoryAnalysisService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class AnalysisServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnalysisServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner loadAnalysisData(AnalysisRepository analysisRepository, LaboratoryAnalysisService laboratoryService) {
		return args -> {
			// Fetch laboratories from an external service
			List<Laboratory> laboratories = laboratoryService.getAllLaboratories().getContent().stream().toList();

			if (laboratories.isEmpty()) {
				System.err.println("No laboratories found. Skipping data initialization.");
				return; // Exit the method early if there are no laboratories
			}

			Random random = new Random();

			for (int i = 0; i < 5; i++) {
				// Create a new Analysis instance
				Analysis analysis = new Analysis();
				analysis.setNom("Analysis " + i);
				analysis.setDescription("Description of Analysis " + i);

				// Assign a random laboratory ID from the fetched laboratories
				Laboratory randomLaboratory = laboratories.get(random.nextInt(laboratories.size()));
				analysis.setFkLaboratoireId(randomLaboratory.getId());
				analysis.setLaboratory(randomLaboratory);

				// Create test analyses associated with the analysis
				List<TestAnalysis> testAnalyses = new ArrayList<>();
				for (int j = 0; j < 5; j++) {
					TestAnalysis testAnalysis = new TestAnalysis();
					testAnalysis.setNomTest("Test " + j);
					testAnalysis.setSousEpreuve("Sub-test " + j);
					testAnalysis.setIntervalMinDeReference(0.0 + j);
					testAnalysis.setIntervalMaxDeReference(10.0 + j);
					testAnalysis.setUniteDeReference("Unit " + j);
					testAnalysis.setDetails("Details of Test " + j);
					testAnalysis.setAnalysis(analysis);
					testAnalyses.add(testAnalysis);
				}

				analysis.setTestAnalysis(testAnalyses);

				// Save the analysis to the repository
				analysisRepository.save(analysis);
			}
		};
	}

}
