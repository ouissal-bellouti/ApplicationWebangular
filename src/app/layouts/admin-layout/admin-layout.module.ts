import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProduitsComponent } from '../../pages/produits/produits.component';

import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UtilisateursComponent } from '../../pages/utilisateurs/utilisateurs.component';
import { ClientsComponent } from '../../pages/clients/clients.component';
import { DevisComponent } from '../../pages/devis/devis.component';
import { FactureComponent } from 'src/app/pages/facture/facture.component';
import { PaiementComponent } from 'src/app/pages/paiement/paiement.component';
import { CategorieProduitComponent } from 'src/app/pages/categorie-produit/categorie-produit.component';


// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,


  ],
  declarations: [
    DashboardComponent,
    UtilisateursComponent,
    ClientsComponent,
    ProduitsComponent,
    DevisComponent,
    NotificationsComponent,
    PaiementComponent,
    FactureComponent,
    CategorieProduitComponent
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
