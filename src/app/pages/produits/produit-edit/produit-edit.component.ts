import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { Guid } from 'guid-typescript';
import { Stock } from '../../stock';
import { Categorie } from '../../categorie';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.scss']
})
export class ProduitEditComponent implements OnInit {
  error: string;
  uploadError: string;
  @ViewChild('image') private image: ElementRef;
  @Output() close = new EventEmitter();

  produitForm: FormGroup;
  Id: Guid = null;
  Categories: Categorie;
  stock: Stock;
  matcher = new ErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api:
    ApiService, private formBuilder: FormBuilder,
     private renderer: Renderer2) { }



  ngOnInit(): void {
  }


  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const productImage = event.target.files[0];

      const formData = new FormData();
      formData.append('productImage', productImage);
      this.api.uploadImage(formData).subscribe(
        res => {
            const li: HTMLLIElement = this.renderer.createElement('li');

            const img: HTMLImageElement = this.renderer.createElement('img');
            this.renderer.addClass(img, 'product-image');

            const a: HTMLAnchorElement = this.renderer.createElement('a');
            a.innerText = 'Delete';
            this.renderer.addClass(a, 'delete-btn');
            a.addEventListener('click', this.api.deleteImage.bind(a));

            this.renderer.appendChild(this.image.nativeElement, li);
            this.renderer.appendChild(li, img);
            this.renderer.appendChild(li, a);
          }, (err: any) => {
            console.log(err);
           }
      );
    }
  }








}
