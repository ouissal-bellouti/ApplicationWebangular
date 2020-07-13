import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Produit } from '../produit';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-produits',
  templateUrl: 'produits.component.html'


})
export class ProduitsComponent implements OnInit {



  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
  }


  deleteProduit(Id: string) {
    this.api.deleteProduit(Id)
    .subscribe(res => {
      this.router.navigate(['/produits']);
    }, (err) => {
      console.log(err);
    });
  }

}
