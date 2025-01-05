package com.example.epreuve_service.repositories;

import com.example.epreuve_service.entities.Epreuve;
import com.example.epreuve_service.repositories.EpreuveRepository;
import com.example.epreuve_service.services.AnalysisClientService;
import com.example.epreuve_service.web.EpreuveController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EpreuveControllerTest {

    @InjectMocks
    private EpreuveController epreuveController;

    @Mock
    private EpreuveRepository epreuveRepository;

    @Mock
    private AnalysisClientService analysisClientService;

    private Epreuve sampleEpreuve;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleEpreuve = new Epreuve();
        sampleEpreuve.setId(1L);
        sampleEpreuve.setNom("Test Epreuve");
        sampleEpreuve.setFkIdAnalyse(100L);
    }

    @Test
    void testCreateEpreuve() {
        when(epreuveRepository.save(any(Epreuve.class))).thenReturn(sampleEpreuve);

        ResponseEntity<Epreuve> response = epreuveController.createEpreuve(sampleEpreuve);

        assertEquals(201, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(sampleEpreuve.getNom(), response.getBody().getNom());
        verify(epreuveRepository, times(1)).save(any(Epreuve.class));
    }

    @Test
    void testUpdateEpreuve() {
        when(epreuveRepository.findById(1L)).thenReturn(Optional.of(sampleEpreuve));

        sampleEpreuve.setNom("Updated Epreuve");
        ResponseEntity<Epreuve> response = epreuveController.updateEpreuve(1L, sampleEpreuve);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("Updated Epreuve", response.getBody().getNom());
        verify(epreuveRepository, times(1)).save(any(Epreuve.class));
    }

    @Test
    void testGetEpreuvesByAnalysis() {
        List<Epreuve> epreuves = Arrays.asList(sampleEpreuve);
        when(epreuveRepository.findByFkIdAnalyse(100L)).thenReturn(epreuves);

        ResponseEntity<List<Epreuve>> response = epreuveController.getEpreuvesByAnalysis(100L);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(epreuveRepository, times(1)).findByFkIdAnalyse(100L);
    }

    @Test
    void testDeleteEpreuve() {
        when(epreuveRepository.findById(1L)).thenReturn(Optional.of(sampleEpreuve));

        ResponseEntity<Void> response = epreuveController.deleteEpreuve(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(epreuveRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetEpreuveById() {
        when(epreuveRepository.findById(1L)).thenReturn(Optional.of(sampleEpreuve));

        ResponseEntity<Epreuve> response = epreuveController.getEpreuveById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(sampleEpreuve.getNom(), response.getBody().getNom());
        verify(epreuveRepository, times(1)).findById(1L);
    }

    @Test
    void testGetAllEpreuves() {
        List<Epreuve> epreuves = Arrays.asList(sampleEpreuve);
        when(epreuveRepository.findAll()).thenReturn(epreuves);

        ResponseEntity<List<Epreuve>> response = epreuveController.getAllEpreuves();

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(epreuveRepository, times(1)).findAll();
    }
}
