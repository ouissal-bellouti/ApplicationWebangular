import { Client } from './client';
import { Article } from './article';
export class Devis {
  Id : string;
  DateLivraison: Date;
  Client: Client;
  Article: Array<Article>;
  PrixTotal:number;
}
