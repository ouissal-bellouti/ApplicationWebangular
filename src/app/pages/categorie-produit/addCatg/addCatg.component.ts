import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie} from '../../Categorie';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from 'src/app/services/categorie.service';
import { CategorieProduitComponent } from 'src/app/pages/categorie-produit/categorie-produit.component'



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-addCatg',
  templateUrl: './addCatg.component.html',
  styleUrls: ['./addCatg.component.css']
})
export class AddCatgComponent implements OnInit {

  listData:FormGroup;
  categorieForm: FormGroup;
  categorie:Categorie;

  constructor(public api: CategorieService ,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private matDialog: MatDialog,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data,
    public dialogRef:MatDialogRef<AddCatgComponent>,) { }

  ngOnInit() {
    if (this.api.choixmenu === 'A')
    {
      this.categorie = {
        nom:'',
        code:null,

      };
     }
     this.categorieForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      code: null,
    });

  }


onSubmit() {

  if (this.api.choixmenu === 'A')
  {
    this.addData();
  }
  else
  {

   this.updateData()
  }
}

addData() {

  this.categorie.nom = this.categorieForm.value.nom;
  this.categorie.code = this.categorieForm.value.code;

  this.api.postData(this.categorie).
  subscribe( data => {
    this.dialogRef.close();

    this.api.getAll().subscribe(
      response =>{this.api.listData = response;}
     );
    this.router.navigate(['/categories']);
  });
}


updateData()
{

  this.categorie.nom = this.categorieForm.value.Nom;
  this.categorie.code = this.categorieForm.value.Code;

  this.api.putData(this.categorie.Id,this.categorie).
  subscribe( data => {
    this.dialogRef.close();

    this.api.getAll().subscribe(
      response =>{this.api.listData = response;}
     );
    this.router.navigate(['/categories']);
  });
}


}
