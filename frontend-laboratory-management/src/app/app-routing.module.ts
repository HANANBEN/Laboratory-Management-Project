import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import des composants
import { LoginComponent } from './home-page/components/login/login.component';
import { HomeComponent } from './home-page/components/home/home.component';
import { AproposComponent } from './home-page/components/apropos/apropos.component';
import { ProjetComponent } from './home-page/components/projet/projet.component';
import { ServiceComponent } from './home-page/components/service/service.component';
import { ContactComponent } from './home-page/components/contact/contact.component';
import { CreateaccountComponent } from './home-page/components/createaccount/createaccount.component';
import { AdminDashboardComponentComponent } from './home-page/components/admin-dashboard-component/admin-dashboard-component.component';
import { TechnicianDashboardComponentComponent } from './home-page/components/technician-dashboard-component/technician-dashboard-component.component';
import { PatientDashboardComponentComponent } from './home-page/components/patient-dashboard-component/patient-dashboard-component.component';

const routes: Routes = [
  // Chargement paresseux des modules principaux
  { path: 'laboratories', loadChildren: () => import('./labo-management/labo-management.module').then(m => m.LaboManagementModule) },
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },

  // Redirection par défaut
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }, // Gérer les routes non définies
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
