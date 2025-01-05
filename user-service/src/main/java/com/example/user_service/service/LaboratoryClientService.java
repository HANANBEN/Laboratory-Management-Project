package com.example.user_service.service;
import com.example.user_service.model.Laboratory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="laboratory-service")

public interface  LaboratoryClientService {
    @GetMapping("/laboratories/{id}?projection=fullLaboratory")
    Laboratory getLaboratoryById(@PathVariable("id") Long id);

    @GetMapping("/laboratories?projection=fullLaboratory")
    PagedModel<Laboratory> getAllLaboratories();

}