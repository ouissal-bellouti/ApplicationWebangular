import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Devis } from 'src/app/pages/devis';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000/Devis'})
};
@Injectable({
  providedIn: 'root'
})
export class DevisService {


  constructor(private http:HttpClient,private toastr: ToastrService) { }

  readonly apiUrl ='http://localhost:5000/Devis';
  list: any={};
  public formData: FormGroup;
  choixmenu ='A';

  saveOrUpdate(info: object) {
    return this.http.post(`${this.apiUrl}`,info);
  }
  getData(Id: string): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/${Id}`);
  }

    updatedata(Id: string, value: any): Observable<Devis> {
      return this.http.put<Devis>(`${this.apiUrl}/${Id}`, value);
    }

    deleteData(Id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
    }

    getAll(): Observable<Devis> {
      return this.http.get<Devis>(`${this.apiUrl}`);
    }

    deleteAll(Id: string): Observable<any> {

      return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
    }



}
