import { Component, OnInit, Inject } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service'
import { FormControl, FormBuilder, FormGroupDirective, FormGroup,NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from '../../utilisateur';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-add-utilisateur',
    templateUrl: './add-utilisateur.component.html',
    styleUrls: ['./add-utilisateur.component.scss']
  })

export class AddUtilisateurComponent implements OnInit {

  listData:FormGroup;
  utilisateurForm:FormGroup;
  utilisateur:Utilisateur;

    constructor(public api: UtilisateurService, public fb: FormBuilder,
      public toastr: ToastrService,
    private matDialog: MatDialog,
    private router : Router,@Inject(MAT_DIALOG_DATA)
    public data,
    public dialogRef:MatDialogRef<AddUtilisateurComponent>
      ) { }

    ngOnInit() {
      if (this.api.choixmenu==='A')
    {
      this.utilisateur = {
        Nom: '',
        Prenom: '',
        UserName: '',
        Telephone: '',
        Adresse: '',
        Type: '',
        Password: '',
      };

    }

    this.utilisateurForm = this.fb.group({
      Id: [''],
      Nom: ['', [Validators.required]],
      Prenom: ['', [Validators.required]],
      UserName: ['', [Validators.required, Validators]],
      Telephone: ['', [Validators.required, Validators]],
      Adresse: ['', [Validators.required, Validators]],
      Type: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators]],
    })
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
    this.utilisateur.Nom = this.utilisateurForm.value.Nom;
    this.utilisateur.Prenom = this.utilisateurForm.value.Prenom;
    this.utilisateur.UserName= this.utilisateurForm.value.UserName;
    this.utilisateur.Adresse = this.utilisateurForm.value.Adresse;
    this.utilisateur.Type = this.utilisateurForm.value.ville;
    this.utilisateur.Telephone = this.utilisateurForm.value.Telephone;
    this.utilisateur.Password = this.utilisateurForm.value.Password;


      this.api.postData(this.utilisateur).
      subscribe( data => {
        this.dialogRef.close();

        this.api.getAll().subscribe(
          response =>{this.api.listData = response;}
         );
        this.router.navigate(['/utilisateurs']);
      });
    }

    updateData()
{
  this.api.putData(this.api.dataForm.value.Id,this.api.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();

    this.api.getAll().subscribe(
      response =>{this.api.listData = response;}
     );
    this.router.navigate(['/utilisateurs']);
  });
}
  }

