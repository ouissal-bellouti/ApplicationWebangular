import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../pages/categorie';
import { FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000/Categorie'})
};

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  listData:Categorie[];
  public categorieForm: FormGroup;
  choixmenu = 'A';
  apiUrl ='http://localhost:5000/Categorie';


  constructor(private http: HttpClient) { }

  getData(Id : string) : Observable<Categorie>{
    return this.http.get<Categorie>(`${this.apiUrl}/${Id}`);
  }

  postData(info: Categorie): Observable<Categorie>{
    return this.http.post<Categorie>(`${this.apiUrl}`,info);
  }
  putData(Id: string, value: any): Observable<Categorie>{
    return this.http.put<Categorie>(`${this.apiUrl}/${Id}`,value);
  }
  deleteData(Id: string): Observable<Categorie>{
    return this.http.delete<Categorie>(`${this.apiUrl}/${Id}`);
  }
  getAll(): Observable<Categorie[]>{
  return this.http.get<Categorie[]>(`${this.apiUrl}`);
}
}
