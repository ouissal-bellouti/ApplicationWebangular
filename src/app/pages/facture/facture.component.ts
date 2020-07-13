import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/services/facture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { Facture } from '../facture';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  factureList:Facture;


  constructor(
    private service: FactureService,
    private router: Router, private toastr: ToastrService,
    public fb: FormBuilder, public clientService: ClientService,
    public serviceArticle: ArticleService, private currentRoute: ActivatedRoute,
  ) { }

  get f() { return this.service.formData.controls }

  ngOnInit(): void {
    this.refreshList();
  }

  newFacture(){
  this.service.choixmenu='A';
  this.router.navigate(['/add-facture'])
  }

  refreshList(){
    this.service.getAll().subscribe(
      response => {this.factureList = response;}
    );
  }


  onSelect(item: Facture){
    this.service.choixmenu = 'M';
    this.service.formData = this.fb.group(Object.assign({},item));
    this.router.navigate(['/add-facture'])
  }


  onDelete(Id: string){
    if (window.confirm('Are sure you want to delete this Article ?')){
      this.service.deleteAll(Id).subscribe(
        data => {
          console.log(data);
          this.toastr.warning('data succefully deleted!');
          this.refreshList();
        },
        error => console.log(error));
    }
  }

}
