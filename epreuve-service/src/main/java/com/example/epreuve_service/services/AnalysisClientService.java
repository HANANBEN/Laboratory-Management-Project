package com.example.epreuve_service.services;


import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name="analysis-service")
public class AnalysisClientService {
}
