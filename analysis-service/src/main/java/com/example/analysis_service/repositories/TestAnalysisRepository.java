package com.example.analysis_service.repositories;

import com.example.analysis_service.entities.TestAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface TestAnalysisRepository extends JpaRepository<TestAnalysis, Long> {
}
