package com.example.examen_service.web;

import com.example.examen_service.entities.Examen;
import com.example.examen_service.repositories.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/examens")
@CrossOrigin(origins = "http://localhost:8070")
public class ExamenController {

    private final ExamenRepository examenRepository;

    @Autowired
    public ExamenController(ExamenRepository examenRepository) {
        this.examenRepository = examenRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Examen> getExamenById(@PathVariable("id") Long id) {
        Optional<Examen> examenOpt = examenRepository.findById(id);
        if (examenOpt.isPresent()) {
            return ResponseEntity.ok(examenOpt.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Examen>> listAllExamens() {
        List<Examen> examens = examenRepository.findAll();
        return ResponseEntity.ok(examens);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Examen> updateExamen(@PathVariable Long id, @RequestBody Examen examen) {
        Optional<Examen> existingExamenOpt = examenRepository.findById(id);
        if (existingExamenOpt.isPresent()) {
            Examen existingExamen = existingExamenOpt.get();

            // Mise à jour des champs dans l'entité Examen
            existingExamen.setFkNumDossier(examen.getFkNumDossier());
            existingExamen.setFkIdEpeuve(examen.getFkIdEpeuve());
            existingExamen.setFkIdTestAnalysis(examen.getFkIdTestAnalysis());
            existingExamen.setResultat(examen.getResultat());

            examenRepository.save(existingExamen);
            return ResponseEntity.ok(existingExamen);
        }
        return ResponseEntity.notFound().build();
    }
}
