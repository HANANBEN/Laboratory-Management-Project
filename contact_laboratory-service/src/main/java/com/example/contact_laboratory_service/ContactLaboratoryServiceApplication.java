package com.example.contact_laboratory_service;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import com.example.contact_laboratory_service.model.Adress;
import com.example.contact_laboratory_service.model.Laboratory;
import com.example.contact_laboratory_service.repositories.ContactLaboratoryRepository;
import com.example.contact_laboratory_service.services.AdressClientService;
import com.example.contact_laboratory_service.services.LaboratoryClientService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class ContactLaboratoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactLaboratoryServiceApplication.class, args);
	}


	@Bean
	 CommandLineRunner LoadContactLaboratory(
			ContactLaboratoryRepository contactrep , AdressClientService adressService , LaboratoryClientService labService) {


		return args -> {

				List<Adress> adresses=adressService.getAllAdresses().getContent().stream().toList();
			List<Laboratory> laboratories=labService.getAllLaboratories().getContent().stream().toList();

			Long laboratoryId=1L;
			Long adressId=1L;
			Random random=new Random();

			Laboratory laboratory=labService.getLaboratoryById(laboratoryId);

			for (int i =0 ; i<7; i++){
// Create a new instance of ContactLaboratory
				ContactLaboratory contactLaboratory = new ContactLaboratory();

// Use setters to assign values
				contactLaboratory.setFax("fax" + i);
				contactLaboratory.setEmail("email" + i);
				contactLaboratory.setNumTel("0958" + i);
				contactLaboratory.setFkIdAdress(adresses.get(random.nextInt(adresses.size())).getId());
				contactrep.save(contactLaboratory);
			}



		};
	};



}
