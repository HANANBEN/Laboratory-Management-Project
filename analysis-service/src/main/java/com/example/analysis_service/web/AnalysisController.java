package com.example.analysis_service.web;

import com.example.analysis_service.entities.Analysis;
import com.example.analysis_service.repositories.AnalysisRepository;
import com.example.analysis_service.model.Laboratory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/analyses")
@CrossOrigin(origins = "http://localhost:5678") // Ajustez l'origine selon vos besoins
public class AnalysisController {

    @Autowired
    private AnalysisRepository analysisRepository;


    // Fetch analysis by specific ID
    @GetMapping("/{id}")
    public ResponseEntity<Analysis> getAnalysisById(@PathVariable("id") Long id) {
        Optional<Analysis> analysis = analysisRepository.findById(id);

        if (analysis.isPresent()) {
            return new ResponseEntity<>(analysis.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Fetch all analyses
    @GetMapping("/listAll")
    public ResponseEntity<List<Analysis>> listAllAnalyses() {
        try {
            List<Analysis> analyses = analysisRepository.findAll();
            return ResponseEntity.ok(analyses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    // Create a new analysis
    @PostMapping("/create")
    public ResponseEntity<Analysis> createAnalysis(@RequestBody Analysis analysis) {
        try {
            Analysis newAnalysis = analysisRepository.save(analysis);
            return ResponseEntity.status(HttpStatus.CREATED).body(newAnalysis);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing analysis
    @PutMapping("/{id}")
    public ResponseEntity<Analysis> updateAnalysis(@PathVariable Long id, @RequestBody Analysis analysis) {
        Optional<Analysis> existingAnalysis = analysisRepository.findById(id);
        if (existingAnalysis.isPresent()) {
            Analysis updatedAnalysis = existingAnalysis.get();
            updatedAnalysis.setNom(analysis.getNom());
            updatedAnalysis.setDescription(analysis.getDescription());
            updatedAnalysis.setFkLaboratoireId(analysis.getFkLaboratoireId());

            analysisRepository.save(updatedAnalysis);
            return ResponseEntity.ok(updatedAnalysis);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
    }

    // Delete an analysis by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalysis(@PathVariable Long id) {
        Optional<Analysis> analysis = analysisRepository.findById(id);
        if (analysis.isPresent()) {
            analysisRepository.deleteById(id); // Deleting the analysis
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Returns 404 Not Found if analysis doesn't exist
        }
    }

    // Fetch analyses by laboratory ID
    @GetMapping("/byLaboratoryId/{laboratoryId}")
    public ResponseEntity<List<Analysis>> getAnalysesByLaboratoryId(@PathVariable Long laboratoryId) {
        List<Analysis> analyses = analysisRepository.findByFkLaboratoireId(laboratoryId);
        return ResponseEntity.ok(analyses);
    }

    // Fetch analyses by laboratory ID, including null values
    @GetMapping("/byLaboratoryIdIncludingNull/{laboratoryId}")
    public ResponseEntity<List<Analysis>> getAnalysesByLaboratoryIdIncludingNull(@PathVariable Long laboratoryId) {
        List<Analysis> analyses = analysisRepository.findByFkLaboratoireIdIncludingNull(laboratoryId);
        return ResponseEntity.ok(analyses);
    }

    // Fetch analyses with null laboratories
    @GetMapping("/null-laboratories")
    public ResponseEntity<List<Analysis>> getAnalysesWithNullLaboratory() {
        List<Analysis> analyses = analysisRepository.findByFkLaboratoireIdIsNull();
        return ResponseEntity.ok(analyses);
    }

    // Fetch analyses that have a particular name
    @GetMapping("/byName/{name}")
    public ResponseEntity<List<Analysis>> getAnalysesByName(@PathVariable String name) {
        List<Analysis> analyses = analysisRepository.findByNom(name);
        return ResponseEntity.ok(analyses);
    }
}
