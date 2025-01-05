package com.example.examen_service.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import com.example.examen_service.entities.Examen;

@Projection(name = "extendedExamen", types = Examen.class)
public interface ExamenProjection {

    Long getId(); // Identifiant de l'examen

    Long getFkNumDossier(); // Clé étrangère pour le Dossier

    @Value("#{target.fkNumDossier != null ? @DossierClientService.getDossierById(target.fkNumDossier) : null}")
    Object getDossierDetails(); // Détails du Dossier via un client Feign

    Long getFkIdEpeuve(); // Clé étrangère pour l'Épreuve

    @Value("#{target.fkIdEpeuve != null ? @EpreuveClientService.getEpreuveById(target.fkIdEpeuve) : null}")
    Object getEpreuveDetails(); // Détails de l'Épreuve via un client Feign

    Long getFkIdTestAnalysis(); // Clé étrangère pour le TestAnalysis

    @Value("#{target.fkIdTestAnalysis != null ? @TestAnalysisClientService.getTestAnalysisById(target.fkIdTestAnalysis) : null}")
    Object getTestAnalysisDetails(); // Détails du TestAnalysis via un client Feign

    String getResultat(); // Résultat de l'examen
}
