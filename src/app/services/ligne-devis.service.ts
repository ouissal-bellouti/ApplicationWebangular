import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Devis } from 'src/app/pages/devis';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';




@Injectable({
  providedIn: 'root'
})
export class LigneDevisService {
   readonly apiUrl ='http://localhost:5000';
   public formData: FormGroup;

  constructor(private http:HttpClient,private toastr: ToastrService) { }


  getData(Id: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }

  addldevis(info: object): Observable<object> {
    return this.http.post(`${this.apiUrl}`, info);
  }

  saveOrUpdate(info: object): Observable<object> {

    return this.http.post(`${this.apiUrl}`, info);
  }
  updatedata(Id: string, value: any): Observable<object> {
    return this.http.put(`${this.apiUrl}/${Id}`, value);
  }

  deleteData(Id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
  }

  getAll(Id: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }

}
