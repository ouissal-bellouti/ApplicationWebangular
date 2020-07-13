
import { Categorie } from 'src/app/pages/categorie'
import { Stock } from './stock';

export class Produit {
  Id: string;
  categorie: Categorie;
  Image: HTMLImageElement;
  Stock: Stock;
  Prix: number;
}
