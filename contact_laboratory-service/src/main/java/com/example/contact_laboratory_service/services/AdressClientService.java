package com.example.contact_laboratory_service.services;


import com.example.contact_laboratory_service.model.Adress;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="adress-service")
public interface AdressClientService {

    @GetMapping("/adresses/{id}?projection=fullAdress")
    Adress getAdressById(@PathVariable("id") Long id);

    @GetMapping("/adresses?projection=fullAdress")
    PagedModel<Adress> getAllAdresses();

}
