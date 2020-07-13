import { Component, OnInit } from '@angular/core';
import { Client } from '../../client';
import { FactureService } from 'src/app/services/facture.service';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../../article';


@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})

export class AddFactureComponent implements OnInit {

  ClientList: Client[];
  isValid:true;
  ToastrService: ToastrService;
  DateGeneration;



  constructor(
    private service :FactureService, private router:Router,
    private toastr :ToastrService, public fb: FormBuilder,
    public clientService: ClientService,
    public serviceArticle: ArticleService,
    private currentRoute: ActivatedRoute,) {}
    get f() { return this.service.formData.controls }


    ngOnInit(): void {
      if(this.service.choixmenu==='A'){
        this.InfoForm();
        this.service.list= [];
        this.DateGeneration = new Date();
        this.getClientList();
      }
      else {
        this.f['DateGeneration'].setValue(formatDate(this.service.formData.value.dateLivaraison, 'yyyy-MM-dd', 'en'));
      }
    }

    InfoForm() {
      this.service.formData = this.fb.group({
        Client: null,
        Statut:'',
        DateEcheance:'',
        DateGeneration: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        Paiement:null,
      });
    }

    newFacture(){
    this.service.choixmenu='A'
    this.router.navigate(['/add-facture']);
  }

    getClientList() {
    this.clientService.getAll().subscribe(
      data => this.ClientList = data
    );
  }

  onSubmit(){
      this.service.saveOrUpdate(this.service.formData.value).
      subscribe( data => {
        this.toastr.success( 'Validation Faite avec Success');
        this.router.navigate(['/facture']);
      });
   }
}
