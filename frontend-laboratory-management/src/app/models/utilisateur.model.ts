import {Laboratoire} from './laboratoire.model';

export interface Utilisateur {
  email: string; // Email unique pour identifier l'utilisateur
  nomComplet: string; // Nom complet de l'utilisateur
  password?: string; // Mot de passe (facultatif)
  profession?: string; // Profession de l'utilisateur
  numTel?: string; // Numéro de téléphone
  signature?: string; // Signature de l'utilisateur
  role?: string; // Rôle de l'utilisateur (ex : Admin, User)
  laboratoireId?: number; // Référence à l'ID du laboratoire
  laboratory?: Laboratoire; // Informations sur le laboratoire associé
}

