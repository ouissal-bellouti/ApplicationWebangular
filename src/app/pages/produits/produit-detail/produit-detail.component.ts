import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/pages/produit';
import { ApiService } from 'src/app/services/api.service';
import { Categorie } from '../../categorie';



@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit {

  produit: Produit = { Id: null,
  categorie: { code: null, nom: '',},
  Stock:{Id: null, Quantite: null}, Image : null, Prix : null};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  getProduitDetail(Id: string){
    this.api.getProduitById(Id)
    .subscribe((data: any) =>{
      this.produit = data;
      console.log(this.produit);
    });
  }
  ngOnInit(): void {
    this.getProduitDetail(this.route.snapshot.params.id);
  }

}
