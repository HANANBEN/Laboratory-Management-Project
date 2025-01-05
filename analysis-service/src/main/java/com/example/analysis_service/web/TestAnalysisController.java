package com.example.analysis_service.web;

import com.example.analysis_service.entities.TestAnalysis;
import com.example.analysis_service.repositories.TestAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-analyses")
@CrossOrigin(origins = "http://localhost:5678")
public class TestAnalysisController {

    @Autowired
    private TestAnalysisRepository testAnalysisRepository;

    // Get all TestAnalysis records
    @GetMapping
    public ResponseEntity<List<TestAnalysis>> getAllTestAnalyses() {
        List<TestAnalysis> testAnalyses = testAnalysisRepository.findAll();
        return ResponseEntity.ok(testAnalyses);
    }

    // Get TestAnalysis by nomTest
    @GetMapping("/by-nom-test/{nomTest}")
    public ResponseEntity<List<TestAnalysis>> getByNomTest(@PathVariable String nomTest) {
        List<TestAnalysis> results = testAnalysisRepository.findByNomTest(nomTest);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis by sousEpreuve
    @GetMapping("/by-sous-epreuve/{sousEpreuve}")
    public ResponseEntity<List<TestAnalysis>> getBySousEpreuve(@PathVariable String sousEpreuve) {
        List<TestAnalysis> results = testAnalysisRepository.findBySousEpreuve(sousEpreuve);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis by intervalMinDeReference
    @GetMapping("/by-interval-min/{intervalMinDeReference}")
    public ResponseEntity<List<TestAnalysis>> getByIntervalMinDeReference(@PathVariable Double intervalMinDeReference) {
        List<TestAnalysis> results = testAnalysisRepository.findByIntervalMinDeReference(intervalMinDeReference);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis by intervalMaxDeReference
    @GetMapping("/by-interval-max/{intervalMaxDeReference}")
    public ResponseEntity<List<TestAnalysis>> getByIntervalMaxDeReference(@PathVariable Double intervalMaxDeReference) {
        List<TestAnalysis> results = testAnalysisRepository.findByIntervalMaxDeReference(intervalMaxDeReference);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis by uniteDeReference
    @GetMapping("/by-unite-reference/{uniteDeReference}")
    public ResponseEntity<List<TestAnalysis>> getByUniteDeReference(@PathVariable String uniteDeReference) {
        List<TestAnalysis> results = testAnalysisRepository.findByUniteDeReference(uniteDeReference);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis by analysisId
    @GetMapping("/by-analysis-id/{analysisId}")
    public ResponseEntity<List<TestAnalysis>> getByAnalysisId(@PathVariable Long analysisId) {
        List<TestAnalysis> results = testAnalysisRepository.findByAnalysisId(analysisId);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis by analysisId including null
    @GetMapping("/by-analysis-id-including-null/{analysisId}")
    public ResponseEntity<List<TestAnalysis>> getByAnalysisIdIncludingNull(@PathVariable Long analysisId) {
        List<TestAnalysis> results = testAnalysisRepository.findByAnalysisIdIncludingNull(analysisId);
        return ResponseEntity.ok(results);
    }

    // Get TestAnalysis with null analysis
    @GetMapping("/with-null-analysis")
    public ResponseEntity<List<TestAnalysis>> getByAnalysisIsNull() {
        List<TestAnalysis> results = testAnalysisRepository.findByAnalysisIsNullNative();
        return ResponseEntity.ok(results);
    }
}