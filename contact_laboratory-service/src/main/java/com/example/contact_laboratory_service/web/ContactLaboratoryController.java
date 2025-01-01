package com.example.contact_laboratory_service.web;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import com.example.contact_laboratory_service.model.Adress;
import com.example.contact_laboratory_service.model.Laboratory;
import com.example.contact_laboratory_service.repositories.ContactLaboratoryRepository;
import com.example.contact_laboratory_service.services.AdressClientService;
import com.example.contact_laboratory_service.services.LaboratoryClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contact-laboratories")
@CrossOrigin(origins = "http://localhost:4200") // Adjust the origin as needed
public class ContactLaboratoryController {

    @Autowired
    private ContactLaboratoryRepository contactLaboratoryRepository;
    @Autowired
    private LaboratoryClientService laboratoryClientService;

    @Autowired
    private AdressClientService adressClientService;

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

    @GetMapping("/laboratoriesListNotAssigned")
    public ResponseEntity<List<Laboratory>> listLaboratoryNotAssigned() {
        // Retrieve all contactLaboratory records
        List<ContactLaboratory> contactLaboratories = contactLaboratoryRepository.findAll();

        // Extract the list of fkidLaboratory from contactLaboratories, ignoring null values
        List<Long> assignedLaboratoryIds = contactLaboratories.stream()
                .map(ContactLaboratory::getFkIdLaboratory)
                .filter(Objects::nonNull) // Exclude null fkidLaboratory
                .collect(Collectors.toList());

        // Fetch all laboratories using the client service
        PagedModel<Laboratory> allLaboratories = laboratoryClientService.getAllLaboratories();


        Collection<Laboratory> laboratories = allLaboratories.getContent();
        laboratories.forEach(lab -> {
            System.out.println("Laboratory ID: " + lab.getId());
            System.out.println("Laboratory Name: " + lab.getNom());
            System.out.println("Laboratory NRC: " + lab.getNrc());
        });
        List<Laboratory> listOfUnassignedLaboratories =laboratories.stream().filter(laboratory -> !assignedLaboratoryIds.contains(laboratory.getId())).toList();


        // Return the filtered list
        return ResponseEntity.ok(listOfUnassignedLaboratories);
    }


    @GetMapping("/addressesListNotAssigned")
    public ResponseEntity<List<Adress>> listAddressesNotAssigned() {
        // Retrieve all contactLaboratory records
        List<ContactLaboratory> contactLaboratories = contactLaboratoryRepository.findAll();

        // Extract the list of fkidAddress from ContactLaboratory, ignoring null values
        Set<Long> assignedAddressIds = contactLaboratories.stream()
                .map(ContactLaboratory::getFkIdAdress)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        // Debugging: Print assignedAddressIds
        System.out.println("Assigned Address IDs: " + assignedAddressIds);

        // Fetch all addresses using the client service
        PagedModel<Adress> allAddresses = adressClientService.getAllAdresses();

        // Filter out addresses that are already assigned to any ContactLaboratory
        List<Adress> unassignedAddresses = allAddresses.getContent().stream()
                .filter(address -> !assignedAddressIds.contains(address.getId()))
                .collect(Collectors.toList());

        // Debugging: Print unassignedAddresses
        System.out.println("Unassigned Addresses: " + unassignedAddresses);

        // Return the filtered list of unassigned addresses
        return ResponseEntity.ok(unassignedAddresses);
    }

    @GetMapping("/listAllContactLaboratories")
    public ResponseEntity<List<ContactLaboratory>> listAllContacts() {
        try {
           List<ContactLaboratory> listAllContacts = contactLaboratoryRepository.findAll();
            return ResponseEntity.ok(listAllContacts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
