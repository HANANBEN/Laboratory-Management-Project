package com.example.examen_service.services;

import com.example.examen_service.model.TestAnalysis;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


public interface TestAnalysisExamenService {
    @GetMapping("/test-analyses/{id}")
    TestAnalysis getTestAnalysisById(@PathVariable("id") Long id);

    @GetMapping("/test-analyses")
    PagedModel<TestAnalysis> getAllTestAnalyses();
}
