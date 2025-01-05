package com.example.dossier_service.web;

import com.example.dossier_service.entities.Dossier;
import com.example.dossier_service.model.User;
import com.example.dossier_service.repositories.DossierRepository;
import com.example.dossier_service.services.UserDossierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dossiers")
@CrossOrigin(origins = "http://localhost:8084") // Ajustez l'origine selon vos besoins
public class DossierController {

    @Autowired
    private DossierRepository dossierRepository;

    @Autowired
    private UserDossierService userDossierService;

    // Fetch dossier by specific ID
    @GetMapping("/{numDossier}")
    public ResponseEntity<Dossier> getDossierByNumDossier(@PathVariable("numDossier") Long numDossier) {
        Optional<Dossier> dossier = dossierRepository.findById(numDossier);

        if (dossier.isPresent()) {
            return new ResponseEntity<>(dossier.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Fetch all dossiers
    @GetMapping("/listAll")
    public ResponseEntity<List<Dossier>> listAllDossiers() {
        try {
            List<Dossier> dossiers = dossierRepository.findAll();
            return ResponseEntity.ok(dossiers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create a new dossier
    @PostMapping("/create")
    public ResponseEntity<Dossier> createDossier(@RequestBody Dossier dossier) {
        try {
            Dossier newDossier = dossierRepository.save(dossier);
            return ResponseEntity.status(HttpStatus.CREATED).body(newDossier);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update an existing dossier
    @PutMapping("/{numDossier}")
    public ResponseEntity<Dossier> updateDossier(@PathVariable Long numDossier, @RequestBody Dossier dossier) {
        Optional<Dossier> existingDossier = dossierRepository.findById(numDossier);
        if (existingDossier.isPresent()) {
            Dossier updatedDossier = existingDossier.get();
            updatedDossier.setPatient(dossier.getPatient());
            updatedDossier.setFkEmailUtilisateur(dossier.getFkEmailUtilisateur());
            updatedDossier.setDate(dossier.getDate());

            dossierRepository.save(updatedDossier);
            return ResponseEntity.ok(updatedDossier);
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
    }

    // Delete a dossier by ID
    @DeleteMapping("/{numDossier}")
    public ResponseEntity<Void> deleteDossier(@PathVariable Long numDossier) {
        Optional<Dossier> dossier = dossierRepository.findById(numDossier);
        if (dossier.isPresent()) {
            dossierRepository.deleteById(numDossier); // Deleting the dossier
            return ResponseEntity.noContent().build(); // Returns 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Returns 404 Not Found if dossier doesn't exist
        }
    }

    // Fetch dossiers by patient ID
    @GetMapping("/byPatientId/{patientId}")
    public ResponseEntity<List<Dossier>> getDossiersByPatientId(@PathVariable Long patientId) {
        List<Dossier> dossiers = dossierRepository.findByPatientId(patientId);
        return ResponseEntity.ok(dossiers);
    }

    // Fetch dossiers associated with a user ID
    @GetMapping("/byUserId/{userId}")
    public ResponseEntity<List<Dossier>> getDossiersByUserId(@PathVariable Long userId) {
        List<Dossier> dossiers = dossierRepository.findByFkEmailUtilisateur(userId);
        return ResponseEntity.ok(dossiers);
    }

    // Fetch the user associated with a dossier by the user email ID
    @GetMapping("/{numDossier}/user")
    public ResponseEntity<User> getUserByDossier(@PathVariable("numDossier") Long numDossier) {
        Dossier dossier = dossierRepository.findById(numDossier).orElse(null);
        if (dossier != null && dossier.getFkEmailUtilisateur() != null) {
            User user = userDossierService.getUserById(dossier.getFkEmailUtilisateur());
            return ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
