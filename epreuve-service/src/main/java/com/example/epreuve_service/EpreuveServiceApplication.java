package com.example.epreuve_service;

import com.example.epreuve_service.entities.Epreuve;
import com.example.epreuve_service.repositories.EpreuveRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class EpreuveServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpreuveServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner start(EpreuveRepository epreuveRepository) {
		return args -> {
			epreuveRepository.saveAll(List.of(
					new Epreuve(null, 1L, "Hematology Test"),
					new Epreuve(null, 2L, "Biochemistry Analysis"),
					new Epreuve(null, 3L, "Microbiology Culture"),
					new Epreuve(null, 4L, "Immunology Screening"),
					new Epreuve(null, 5L, "Pathology Examination")
			));
			epreuveRepository.findAll().forEach(System.out::println);
		};
	}
}
