import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adress-home', // Le sélecteur que vous utiliserez dans l'HTML
  templateUrl: './adress-home.component.html', // Le fichier HTML associé
  styleUrls: ['./adress-home.component.css'],
   standalone : true ,

})
export class AdressHomeComponent {
  // Vous pouvez ajouter des propriétés ou méthodes ici si nécessaire


  constructor(private router : Router) {
  }

  navigateToAddressList() {

    this.router.navigate(['/adress/list'])
  }
}

