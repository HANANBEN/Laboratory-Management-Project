package com.example.epreuve_service.web;


import com.example.epreuve_service.entities.Epreuve;
import com.example.epreuve_service.repositories.EpreuveRepository;
import com.example.epreuve_service.services.AnalysisClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/epreuves")
@CrossOrigin(origins = "http://localhost:4200") // Allow CORS for your Angular app
public class EpreuveController {

    @Autowired
    private EpreuveRepository epreuveRepository;

    @Autowired
    private AnalysisClientService analysisClientService;


    // Create new Epreuve for an existing analysis
    @PostMapping("/create")
    public ResponseEntity<Epreuve> createEpreuve(@RequestBody Epreuve epreuve) {
        try {
            Epreuve newEpreuve = epreuveRepository.save(epreuve);
            return ResponseEntity.status(HttpStatus.CREATED).body(newEpreuve);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing Epreuve
    @PutMapping("/{id}")
    public ResponseEntity<Epreuve> updateEpreuve(@PathVariable Long id, @RequestBody Epreuve epreuve) {
        Optional<Epreuve> existingEpreuve = epreuveRepository.findById(id);
        if (existingEpreuve.isPresent()) {
            Epreuve updatedEpreuve = existingEpreuve.get();
            updatedEpreuve.setNom(epreuve.getNom());
            updatedEpreuve.setFkIdAnalyse(epreuve.getFkIdAnalyse());
            // Set other necessary fields...
            epreuveRepository.save(updatedEpreuve);
            return ResponseEntity.ok(updatedEpreuve);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get all Epreuves associated with an analysis
    @GetMapping("/byAnalysis/{analysisId}")
    public ResponseEntity<List<Epreuve>> getEpreuvesByAnalysis(@PathVariable Long analysisId) {
        List<Epreuve> epreuves = epreuveRepository.findByFkIdAnalyse(analysisId);
        return ResponseEntity.ok(epreuves);
    }


    // Delete an Epreuve by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEpreuve(@PathVariable Long id) {
        Optional<Epreuve> epreuve = epreuveRepository.findById(id);
        if (epreuve.isPresent()) {
            epreuveRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Epreuve>> getAllEpreuves() {
        List<Epreuve> epreuves = epreuveRepository.findAll();
        return ResponseEntity.ok(epreuves);
    }

    // Get an Epreuve by ID
    @GetMapping("/{id}")
    public ResponseEntity<Epreuve> getEpreuveById(@PathVariable Long id) {
        Optional<Epreuve> epreuve = epreuveRepository.findById(id);
        return epreuve.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


}
