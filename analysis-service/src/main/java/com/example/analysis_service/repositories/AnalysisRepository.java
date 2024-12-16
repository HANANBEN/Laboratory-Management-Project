package com.example.analysis_service.repositories;

import com.example.analysis_service.entities.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface AnalysisRepository extends JpaRepository<Analysis , Long> {
}
