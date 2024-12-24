package com.example.laboratory_service;

import com.example.laboratory_service.entities.Laboratory;
import com.example.laboratory_service.repositories.LaboratoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Base64;
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


// Use ClassPathResource to locate the image file
			var imageResource = new ClassPathResource("static/images/lab-logo-1.png");

// Ensure the file exists
			if (!imageResource.exists()) {
				throw new RuntimeException("Image file not found: " + imageResource.getPath());
			}

// Read the file bytes
			byte[] imageBytes = Files.readAllBytes(imageResource.getFile().toPath());
			String base64Image = Base64.getEncoder().encodeToString(imageBytes);


			labrep.saveAll(List.of(
					new Laboratory("hananeee", base64Image , "nrc", true, dateFormat.parse("1990-05-20")),
					new Laboratory("lab2", base64Image, "nrc", true, dateFormat.parse("1995-08-15"))
			));
			labrep.findAll().forEach(System.out::println);


		};
	}
}
