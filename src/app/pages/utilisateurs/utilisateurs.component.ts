import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from '../utilisateur';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUtilisateurComponent } from './add-utilisateur/add-utilisateur.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: 'utilisateurs.component.html'
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur;

  listData: Observable<Utilisateur[]>;
  utilisateur: Utilisateur;


  constructor(public api: UtilisateurService,
     public toaster: ToastrService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) {}

  ngOnInit(): void {
    this.getData();
  }

  addUtilisateur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    const dialogRef = this.matDialog.open(AddUtilisateurComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.getData());
  }

  removeData(Id: string) {
    if (window.confirm('Are sure you want to delete this user ?')) {
    this.api.deleteData(Id)
      .subscribe(
        data => {
          console.log(data);
          this.toaster.warning('data succefully deleted!');
          this.getData();
        },
        error => console.log(error));
  }
  }

  getData() {
    this.listData = this.api.getAll().pipe(
      tap(t => console.log(t))
      );
  }

  selectData(item : Utilisateur) {
    this.api.choixmenu = 'M';
    this.api.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width='50%';

    this.matDialog.open(AddUtilisateurComponent, dialogConfig);
  }

 }
