package com.example.contact_laboratory_service.web;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import com.example.contact_laboratory_service.repositories.ContactLaboratoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact-laboratories")
@CrossOrigin(origins = "http://localhost:4200") // Adjust the origin as needed
public class ContactLaboratoryController {

    @Autowired
    private ContactLaboratoryRepository contactLaboratoryRepository;

    // Fetch contact laboratories by specific laboratory ID
    @GetMapping("/byLaboratoryId/{laboratoryId}")
    public List<ContactLaboratory> getByLaboratoryId(@PathVariable Long laboratoryId) {
        return contactLaboratoryRepository.findByFkIdLaboratory(laboratoryId);
    }

    // Fetch contact laboratories by laboratory ID, including null values
    @GetMapping("/byLaboratoryIdIncludingNull/{laboratoryId}")
    public List<ContactLaboratory> getByLaboratoryIdIncludingNull(@PathVariable Long laboratoryId) {
        return contactLaboratoryRepository.findByFkIdLaboratoryIncludingNull(laboratoryId);
    }

    // Fetch contacts with null laboratories
    @GetMapping("/null-laboratories")
    public List<ContactLaboratory> getContactsWithNullLaboratory() {
        return contactLaboratoryRepository.findByFkIdLaboratoryIsNull();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactLaboratory> updateContactLaboratory(@PathVariable Long id, @RequestBody ContactLaboratory contactLaboratory) {
        Optional<ContactLaboratory> existingContact = contactLaboratoryRepository.findById(id);
        if (existingContact.isPresent()) {
            ContactLaboratory updatedContact = existingContact.get();
            updatedContact.setNumTel(contactLaboratory.getNumTel());
            updatedContact.setFax(contactLaboratory.getFax());
            updatedContact.setEmail(contactLaboratory.getEmail());
            updatedContact.setFkIdLaboratory(contactLaboratory.getFkIdLaboratory());
            updatedContact.setFkIdAdress(contactLaboratory.getFkIdAdress());

            contactLaboratoryRepository.save(updatedContact);
            return ResponseEntity.ok(updatedContact);
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if not found
        }

    }


    @PostMapping("/create")
    public ResponseEntity<ContactLaboratory> createContact(@RequestBody ContactLaboratory contact) {
        try {
            ContactLaboratory newContact = contactLaboratoryRepository.save(contact);
            return ResponseEntity.status(HttpStatus.CREATED).body(newContact);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}