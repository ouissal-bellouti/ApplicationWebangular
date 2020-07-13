import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../article';
import { ArticleService } from 'src/app/services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../../produit';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { DevisService } from 'src/app/services/devis.service';



@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {


  formData: FormGroup;
  produitList: Produit[];
  isValid: boolean;
  iPrixTTC=0;
  iPrixTVA=0;


  constructor(
    public service: ArticleService,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddArticleComponent>,
    private produitService: ApiService,
    private devisService: DevisService,
    public fb: FormBuilder ) { }

  get f() {  return this.formData.controls;}

  ngOnInit(): void {

    if(this.data.articleIndex==null)
    {
      this.InfoForm();
    }
    else
    {
     this.formData =this.fb.group(Object.assign({},this.devisService.list[this.data.articleIndex]));
    }
  }

  onSubmit() {

    if(this.data.articleIndex==null)
    {
      this.devisService.list.push(this.formData.value)
      this.dialogRef.close();
    }
    else
  {

    this.devisService.list[this.data.articleIndex] = this.formData.value;
  }
  this.dialogRef.close();

  }

InfoForm() {
  this.formData = this.fb.group({
      nom: ['',[Validators.required]],
      quantite :  [null,[Validators.required]],
      prixHT :  [null,[Validators.required]],
      prixTTC :  [null,[Validators.required]],
      tva:  [null,[Validators.required]],
      designation: ['',[Validators.required]],
    });
  }


  selectPrix(ctrl){
    if(ctrl.selectedIndex==0){
      this.f['prixHT'].setValue(0);
      this.f['tva'].setValue(0);
      this.f['quantite'].setValue(0);
    }
    else {
      this.f['prixHT'].setValue(this.formData[ctrl.selectedIndex-1].PrixHT);
      this.f['tva'].setValue(this.formData[ctrl.selectedIndex-1].TVA);
    }
  }

  calcul() {
    if(this.formData.value.quantite > 0 && this.formData.value.prixHT > 0){
      this.iPrixTTC =parseFloat((this.formData.value.quantite * this.formData.value.prixHT).toFixed(3));
      this.iPrixTVA =parseFloat((this.iPrixTTC + this.formData.value.tva).toFixed(3));
      this.f['prixTTC'].setValue(this.iPrixTTC);
    }
  }

  validateForm(formData: Article){
    this.isValid=true;
    if(formData.Id==='')
      this.isValid=false;
      else if(formData.Quantite===0)
      this.isValid=false;
      return this.isValid;
  }

}
