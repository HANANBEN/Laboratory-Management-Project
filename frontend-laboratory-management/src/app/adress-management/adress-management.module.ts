import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdressHomeComponent } from './components/adress-home/adress-home.component'; // Importez votre composant

@NgModule({
  declarations: [
      // Déclarez votre composant ici
  ],
  imports: [
    AdressHomeComponent,
    CommonModule
  ],
  exports: [AdressHomeComponent] // Exportez-le pour qu'il soit accessible à d'autres modules si nécessaire
})
export class AdressManagementModule { }
