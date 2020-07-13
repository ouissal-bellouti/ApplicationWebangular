import { Client } from './client';
import { Devis } from './devis';
import { Paiement } from './paiement';


export class Facture {
  Id? : string;
  Statut : string;
  Client: Client;
  DateGeneration: Date;
  DateEcheance: Date;
  Devis: Array<Devis>;
  Paiement: Paiement;

}
