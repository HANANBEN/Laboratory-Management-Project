package com.example.examen_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ExamenServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamenServiceApplication.class, args);
	}

}
