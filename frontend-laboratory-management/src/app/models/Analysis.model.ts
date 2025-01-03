import { TestAnalysis } from './testAnalysis.model';

export interface Analysis {
  id: number; // Identifiant de l'analyse
  fkLaboratoireId: number; // Clé étrangère vers Laboratory
  nom: string; // Nom de l'analyse
  description: string; // Description de l'analyse
  testAnalysis: TestAnalysis[]; // Liste des tests associés
}
