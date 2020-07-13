import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000'})
};


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http:HttpClient,private toastr: ToastrService) { }

  readonly apiUrl ='http://localhost:5000/api/Facture';
  list: any={};
  public formData: FormGroup;
  choixmenu = 'A';


  getData(Id: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }

  save(info: object){
   alert('gfgfgf');
    const body ={
      ...info,
      lcommande:this.list
    };
    return this.http.post(`${this.apiUrl}`, body);

  }
    updatedata(Id: string, value: any): Observable<object> {
      return this.http.put(`${this.apiUrl}/${Id}`, value);
    }

    deleteData(Id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
    }

    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
    }

    deleteAll(Id: string): Observable<any> {

      return this.http.delete(`${this.apiUrl}/${Id}`, { responseType: 'text' });
    }

    saveOrUpdate(info: object) {
      return this.http.post(`${this.apiUrl}`,info);
    }

}
