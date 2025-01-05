package com.example.examen_service.services;

import com.example.examen_service.model.Epreuve;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@Service
@FeignClient(name = "epreuve-service")
public interface EpreuveExamenService {
    @GetMapping("/epreuves/{id}")
    Epreuve getEpreuveById(@PathVariable("id") Long id);

    @GetMapping("/epreuves")
    PagedModel<Epreuve> getAllEpreuves();
}
