export interface Patient {
  id: number; // ID unique du patient
  nomComplet: string; // Nom complet du patient
  dateNaissance: string; // Date de naissance au format ISO (ex: 'YYYY-MM-DD')
  lieuDeNaissance: string; // Lieu de naissance du patient
  sexe: string; // Sexe du patient (ex: 'Homme' ou 'Femme')
  typePieceIdentite: string; // Type de pièce d'identité (ex: 'CIN', 'Passeport')
  numPieceIdentite: string; // Numéro de la pièce d'identité
  adresse: string; // Adresse complète du patient
  numTel: string; // Numéro de téléphone
  email: string; // Adresse email
  visiblePour: string; // Utilisateurs ou rôles ayant accès aux informations du patient
  numDossier: string; // Numéro du dossier associé
}
