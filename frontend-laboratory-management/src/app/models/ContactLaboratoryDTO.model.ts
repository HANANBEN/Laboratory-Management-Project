import {Laboratoire} from './laboratoire.model';
import {Adress} from './adress.model';

export interface ContactLaboratoryDTO {
  fkIdLaboratory: number; // Foreign Key to Laboratory

  fkIdAdress: number; // Foreign Key to Address
  numTel: string;
  fax?: string; // Optional field
  email: string;
  laboratory: Laboratoire; // Reuse Laboratory model
  adress: Adress;


}
