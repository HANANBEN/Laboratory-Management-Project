package com.example.laboratory_service;

import com.example.laboratory_service.entities.Laboratory;
import com.example.laboratory_service.repositories.LaboratoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.SimpleDateFormat;
import java.util.List;

@SpringBootApplication
public class  LaboratoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaboratoryServiceApplication.class, args);
	}


	@Bean
	CommandLineRunner start(LaboratoryRepository labrep){
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		return args -> {

			labrep.saveAll(List.of(
					new Laboratory("lab1", "logolab1", "nrc", true, dateFormat.parse("1990-05-20")),
					new Laboratory("lab2", "logolab2", "nrc", true, dateFormat.parse("1995-08-15"))
			));

			labrep.findAll().forEach(System.out::println);


		};
	}
}
