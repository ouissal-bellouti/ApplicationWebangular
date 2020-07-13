import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DevisService } from 'src/app/services/devis.service';
import { Devis } from 'src/app/pages/devis';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { map } from 'rxjs/operators';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfmake from 'pdfmake/build/pdfmake';
import { style } from '@angular/animations';
import { ClientService } from 'src/app/services/client.service';
import { ArticleService } from 'src/app/services/article.service';
import { Client } from '../client';
pdfmake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-devis',
  templateUrl: 'devis.component.html'
})
export class DevisComponent implements OnInit {



  devisList: Devis;
  SearchText: string;

  constructor(
    private service :DevisService, private router:Router,
    private toastr :ToastrService, public fb: FormBuilder,
    private datePipe : DatePipe,
    public clientService: ClientService,
    public serviceArticle: ArticleService,
    private currentRoute: ActivatedRoute,) {}
    get f() { return this.service.formData.controls }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.service.getAll().subscribe(
      response => {this.devisList = response;}
    );
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


  newDevis(){
    this.service.choixmenu='A'
    this.router.navigate(['/add-devis']);
  }

   getData(){
     this.service.getAll().subscribe(
       Response => {this.service.list = Response}
     );
   }

   onSelect(item: Devis){
     this.service.choixmenu = 'M';
     this.service.formData = this.fb.group(Object.assign({},item));
     this.router.navigate(['/add-devis'])
   }

   generatepdf() {
     const document = this.getDocument();
     pdfmake.createPdf(document).open();
   }

   transformDate(date){
     return this.datePipe.transform(date, 'yyyy/MM/dd')
   }


  getDocument() {
    return {
      content: [
        [{
          text: 'InovaSquad',
          style:'name'
        },
        {
          text: 'Technopark Tanger'
        },
        {
          text: 'Lien : http://www.inovasquad.com/'
        },
        {
          text: 'Contact: Badre El Faiz'
        },
        {
          text: 'Listes Des Devis',
          bold: true,
          fontSize:20,
          alignment:'center',
          margin:[0,0,0,20]
        },
        this.getList(this.service.list),
        {

        },

        {
          text:'InovaSquad',
          style:'sign',
          alignment:'right'
        },

        ],
      ],
      styles: {
        header: {
          fontSize:18,
          bold: true,
          margin:[0,20,0,10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        totale: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize:12,
          bold:true,
          italics: true,
        },
        sign: {
          margin: [0,50,0,10],
          alignment:'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 15,
          alighment:'center'
        }

      }
    }
  }

  getList(item: Devis[]) {
    return {
      table: {
        widths: ['*','*','*','*','*'],
        body: [
          [
            {
              text: 'Reference',
              style: 'tableHeader'
            },
            {
              text: 'CLIENT',
              style: 'tableHeader'
            },
            {
              text: 'Article',
              style: 'tableHeader'
            },
            {
              text: 'Prix Totale',
              style: 'tableHeader'
            },
            {
              text: 'Date De Creation',
              style: 'tableHeader'
            },
          ],
          ...item.map(ed => {
            return [ed.Id, ed.Client, ed.Article, ed.PrixTotal, ,ed.DateLivraison];
          })
        ]
      }
    };
  }

}
