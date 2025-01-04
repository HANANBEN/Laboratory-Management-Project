package com.example.examen_service.services;

import com.example.examen_service.model.Analysis;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
@Service
@FeignClient(name = "analysis-service")
public interface AnalysisExamenService {
    @GetMapping("/analyses/{id}?projection=extendedAnalysis")
    Analysis getAnalysisById(@PathVariable("id") Long id);

    @GetMapping("/analyses?projection=extendedAnalysis")
    PagedModel<Analysis> getAllAnalyses();
}
