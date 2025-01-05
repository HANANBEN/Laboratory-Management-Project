package com.example.epreuve_service.services;


import com.example.epreuve_service.model.Analysis;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name="analysis-service" , url = "http://localhost:9999/analysis-service/api/analyses" )

public interface AnalysisClientService {
    @GetMapping("/{id}")
    ResponseEntity<Analysis> getAnalysisById(@PathVariable("id") Long id);
    @GetMapping("/listAll")
    ResponseEntity<List<Analysis>> listAllAnalyses();

    @PostMapping("/create")
    ResponseEntity<Analysis> createAnalysis(@RequestBody Analysis analysis);

    @PutMapping("/{id}")
    ResponseEntity<Analysis> updateAnalysis(@PathVariable("id") Long id, @RequestBody Analysis analysis);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteAnalysis(@PathVariable("id") Long id);

    @GetMapping("/byLaboratoryId/{laboratoryId}")
    ResponseEntity<List<Analysis>> getAnalysesByLaboratoryId(@PathVariable("laboratoryId") Long laboratoryId);

    @GetMapping("/null-laboratories")
    ResponseEntity<List<Analysis>> getAnalysesWithNullLaboratory();
}
