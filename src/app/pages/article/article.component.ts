import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FactureService } from 'src/app/services/facture.service';
import { ArticleService } from 'src/app/services/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Produit } from 'src/app/pages/produit';
import { ApiService } from 'src/app/services/api.service';
import { Article } from '../article';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(
    public service: ArticleService, private toastr: ToastrService,
  @Inject(MAT_DIALOG_DATA) public data,


  ) { }

  ngOnInit(): void {
  }

}
