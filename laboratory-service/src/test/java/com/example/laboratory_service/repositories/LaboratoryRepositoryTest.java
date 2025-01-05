package com.example.laboratory_service.repositories;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.laboratory_service.entities.Laboratory;


import java.util.Date;
import java.util.List;

@SpringBootTest
public class LaboratoryRepositoryTest {

    private static final Logger logger = LoggerFactory.getLogger(LaboratoryRepositoryTest.class);

    @Autowired
    private LaboratoryRepository laboratoryRepository;

    // Sample data for setup
    private Laboratory lab1;
    private Laboratory lab2;

    @BeforeEach
    public void setUp() {
        // Clean up the database before each test
        laboratoryRepository.deleteAll();

        Date currentDate = new Date(); // Or set a specific date as needed

        // Creating two laboratory instances using the full constructor
        Laboratory lab1 = new Laboratory("Nom", "logo1.png", "nrc1", true, currentDate);
        Laboratory lab2 = new Laboratory("Nom", "logo2.png", "nrc2", true, currentDate);

        laboratoryRepository.save(lab1);
        laboratoryRepository.save(lab2);

        logger.info("Test data inserted: {}", laboratoryRepository.findAll());
    }

    @AfterEach
    public void tearDown() {
        // Clean up the database after each test
        laboratoryRepository.deleteAll();
        logger.info("Database cleaned after test");
    }

    @Test
    public void testFindByNomContaining() {
        List<Laboratory> results = laboratoryRepository.findByNomContaining("Nom");

        logger.info("testFindByNomContaining results: {}", results);

        // Expect 2 labs, as we inserted 2
        Assertions.assertEquals(2, results.size(), "Number of labs found should be 2");
    }

    @Test
    public void testFindByNomContainingAndActive() {
        List<Laboratory> results = laboratoryRepository.findByNomContainingAndActive("Nom", true);

        logger.info("testFindByNomContainingAndActive results: {}", results);

        // Expect 2 active labs containing "Nom" in their name
        Assertions.assertEquals(2, results.size(), "Number of active labs found should be 2");
    }

    @Test
    public void testFindByActive() {
        List<Laboratory> results = laboratoryRepository.findByActive(true);

        logger.info("testFindByActive results: {}", results);

        // Expect 2 active labs, as we inserted 2 active labs
        Assertions.assertEquals(2, results.size(), "Number of active labs should be 2");
    }

}
