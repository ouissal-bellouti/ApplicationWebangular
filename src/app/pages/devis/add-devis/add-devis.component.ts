import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from '../../client';
import { Devis } from '../../devis';
import { DevisService } from 'src/app/services/devis.service';
import {DatePipe, formatDate} from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import '@angular/localize/init';
import { Article } from '../../article';
import { ArticleService } from 'src/app/services/article.service';
import { AddArticleComponent } from '../../article/add-article/add-article.component';


@Component({
  selector: 'app-add-devis',
  templateUrl: './add-devis.component.html',
})
export class AddDevisComponent implements OnInit {

  ClientList: Client[];
  ArticleList: Array<Article>;
  isValid:true;
  ToastrService: ToastrService;
  DateLivraison;

  constructor(
    public service:DevisService,
    private dialog:MatDialog,
    public fb: FormBuilder,
    public clientService :ClientService,
    private toastr :ToastrService,
    public articleService: ArticleService,
    private router :Router) { }
    get f() { return this.service.formData.controls }

    ngOnInit(): void {
      if(this.service.choixmenu ==='A'){
        this.InfoForm();
        this.service.list= [];
        this.DateLivraison= new Date();
        this.getClientList();
      }
      else {
        this.articleService.getData(this.service.formData.value.id).subscribe(res => {
          this.service.formData = this.fb.group(Object.assign({},res));
        });
        this.articleService.getAll(this.service.formData.value.id).subscribe(
          Response => {this.service.list= Response}
        );
        this.f['dateLivaraison'].setValue(formatDate(this.service.formData.value.dateLivaraison, 'yyyy-MM-dd', 'en'));
      }
    }

  getClientList() {
    this.clientService.getAll().subscribe(
      data => this.ClientList = data
    );
  }

    InfoForm() {
      this.service.formData = this.fb.group({
        client: null,
        article: [],
        prixTotal: 0,
        prixHT: 0,
        tva: 0,
        dateLivaraison: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      });
    }


    ResetForm() {
      this.service.formData.reset();
    }

    AddData(articleIndex, id){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width='50%';
      dialogConfig.data={articleIndex, id};
      this.dialog.open(AddArticleComponent, dialogConfig).afterClosed().
      subscribe(b10 => {
        this.calcul();
      });
    }

    onDelete(item: Article, Id: string, i:number){
      if(Id !== '')
      this.service.formData.value.id+=Id;
      this.service.list.splice(i,1);
      this.calcul();
    }

    calcul(){
      this.f.prixTotal.setValue(this.service.list.reduce((prev, curr)=>{
        return prev + curr.prixTTC;
      },0));
    }

    onSubmit(){
      this.f['article'].setValue(this.service.list);
        this.service.saveOrUpdate(this.service.formData.value).
        subscribe( data => {
          this.toastr.success( 'Validation Faite avec Success');
          this.router.navigate(['/devis']);
        });
     }


  }
