package com.example.contact_laboratory_service.repositories;

import com.example.contact_laboratory_service.entities.ContactLaboratory;
import com.example.contact_laboratory_service.repositories.ContactLaboratoryRepository;
import com.example.contact_laboratory_service.services.AdressClientService;
import com.example.contact_laboratory_service.services.LaboratoryClientService;
import com.example.contact_laboratory_service.web.ContactLaboratoryController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ContactLaboratoryControllerTest {

    @InjectMocks
    private ContactLaboratoryController contactLaboratoryController;

    @Mock
    private ContactLaboratoryRepository contactLaboratoryRepository;

    @Mock
    private LaboratoryClientService laboratoryClientService;

    @Mock
    private AdressClientService adressClientService;

    private ContactLaboratory sampleContactLaboratory;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleContactLaboratory = new ContactLaboratory();
        sampleContactLaboratory.setId(1L);
        sampleContactLaboratory.setNumTel("123456789");
        sampleContactLaboratory.setFax("987654321");
        sampleContactLaboratory.setEmail("test@example.com");
    }

    @Test
    void testCreateContactLaboratory() {
        // Arrange
        when(contactLaboratoryRepository.save(any(ContactLaboratory.class)))
                .thenReturn(sampleContactLaboratory);

        // Act
        ResponseEntity<ContactLaboratory> response = contactLaboratoryController.createContact(sampleContactLaboratory);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(sampleContactLaboratory.getId(), response.getBody().getId());
    }

    @Test
    void testGetContactLaboratoryById() {
        // Arrange
        when(contactLaboratoryRepository.findById(1L))
                .thenReturn(Optional.of(sampleContactLaboratory));

        // Act
        ResponseEntity<ContactLaboratory> response = contactLaboratoryController.getContactLaboratoryById(1L);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(sampleContactLaboratory.getId(), response.getBody().getId());
    }

    @Test
    void testGetContactLaboratoryById_NotFound() {
        // Arrange
        when(contactLaboratoryRepository.findById(1L))
                .thenReturn(Optional.empty());

        // Act
        ResponseEntity<ContactLaboratory> response = contactLaboratoryController.getContactLaboratoryById(1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testUpdateContactLaboratory() {
        // Arrange
        when(contactLaboratoryRepository.findById(1L))
                .thenReturn(Optional.of(sampleContactLaboratory));
        when(contactLaboratoryRepository.save(any(ContactLaboratory.class)))
                .thenReturn(sampleContactLaboratory);

        sampleContactLaboratory.setNumTel("111222333");

        // Act
        ResponseEntity<ContactLaboratory> response = contactLaboratoryController.updateContactLaboratory(1L, sampleContactLaboratory);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("111222333", response.getBody().getNumTel());
    }

    @Test
    void testUpdateContactLaboratory_NotFound() {
        // Arrange
        when(contactLaboratoryRepository.findById(1L))
                .thenReturn(Optional.empty());

        // Act
        ResponseEntity<ContactLaboratory> response = contactLaboratoryController.updateContactLaboratory(1L, sampleContactLaboratory);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testDeleteContactLaboratory() {
        // Arrange
        when(contactLaboratoryRepository.findById(1L))
                .thenReturn(Optional.of(sampleContactLaboratory));

        // Act
        ResponseEntity<Void> response = contactLaboratoryController.deleteContact(1L);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(contactLaboratoryRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteContactLaboratory_NotFound() {
        // Arrange
        when(contactLaboratoryRepository.findById(1L))
                .thenReturn(Optional.empty());

        // Act
        ResponseEntity<Void> response = contactLaboratoryController.deleteContact(1L);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(contactLaboratoryRepository, never()).deleteById(1L);
    }

    @Test
    void testGetByLaboratoryId() {
        // Arrange
        when(contactLaboratoryRepository.findByFkIdLaboratory(1L))
                .thenReturn(Arrays.asList(sampleContactLaboratory));

        // Act
        List<ContactLaboratory> contactLaboratories = contactLaboratoryController.getByLaboratoryId(1L);

        // Assert
        assertEquals(1, contactLaboratories.size());
        assertEquals(sampleContactLaboratory.getId(), contactLaboratories.get(0).getId());
    }
}
