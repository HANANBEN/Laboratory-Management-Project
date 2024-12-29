package com.example.adress_service;

import com.example.adress_service.entities.Adress;
import com.example.adress_service.repositories.AdressRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.List;

@SpringBootApplication
public class AdressServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdressServiceApplication.class, args);
	}


	@Bean
	CommandLineRunner start(AdressRepository adrep){
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		return args -> {
			adrep.saveAll(List.of(
					new Adress(null, 10, "Rue Al Moukaouama", 10000L, "Rabat", "Rabat-Salé-Kénitra"),
					new Adress(null, 25, "Avenue Hassan II", 40000L, "Marrakech", "Marrakech-Safi"),
					new Adress(null, 7, "Boulevard Mohammed V", 80000L, "Agadir", "Souss-Massa"),
					new Adress(null, 33, "Rue Abou Bakr Assedik", 30000L, "Fès", "Fès-Meknès"),
					new Adress(null, 50, "Route de Casablanca", 90000L, "Tanger", "Tanger-Tétouan-Al Hoceïma")
			));
			adrep.findAll().forEach(System.out::println);
		};

	}

}
