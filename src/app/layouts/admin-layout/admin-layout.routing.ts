import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UtilisateursComponent } from '../../pages/utilisateurs/utilisateurs.component';

import { DevisComponent } from '../../pages/devis/devis.component';


import { FactureComponent } from 'src/app/pages/facture/facture.component';

import { PaiementComponent } from 'src/app/pages/paiement/paiement.component';

import { ProduitsComponent } from '../../pages/produits/produits.component';
import { ProduitAddComponent } from 'src/app/pages/produits/produit-add/produit-add.component';
import { ProduitEditComponent } from 'src/app/pages/produits/produit-edit/produit-edit.component';
import { ProduitDetailComponent } from 'src/app/pages/produits/produit-detail/produit-detail.component';

import { ClientsComponent } from '../../pages/clients/clients.component';
import { AddClientComponent } from 'src/app/pages/clients/add-client/add-client.component';
import { CategorieProduitComponent } from 'src/app/pages/categorie-produit/categorie-produit.component';
import { AddDevisComponent } from 'src/app/pages/devis/add-devis/add-devis.component';
import { AddFactureComponent } from 'src/app/pages/facture/add-facture/add-facture.component';




// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'paiement', component: PaiementComponent},
  { path: 'produit-add', component: ProduitAddComponent},
  { path: 'produit-edit', component: ProduitEditComponent},
  { path: 'produit-detail', component: ProduitDetailComponent},
  { path: 'add-client', component: AddClientComponent},
  { path: 'categories', component: CategorieProduitComponent},
  { path: 'add-devis', component: AddDevisComponent},
  { path: 'add-facture', component:AddFactureComponent}

];
