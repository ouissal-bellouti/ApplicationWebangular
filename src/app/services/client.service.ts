import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../pages/client';
import { FormGroup } from '@angular/forms';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000/Client'},
  )
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl ='http://localhost:5000/Client';
  choixmenu = 'A';
  listData: Client[];
  public clientForm : FormGroup;

  constructor(private http: HttpClient) { }

  GetData(Id: string): Observable<Client>{
    return this.http.get<Client>(`${this.apiUrl}/${Id}`)
  }
  postData(info) : Observable<Client>{
    return this.http.post<Client>(`${this.apiUrl}`,info);
  }
  putData(Id: string, value:any):  Observable<Client>{
    return this.http.put<Client>(`${this.apiUrl}/${Id}`,value);
  }
  deleteData(Id: string): Observable<Client>{
    return this.http.delete<Client>(`${this.apiUrl}/${Id}`);
  }
  getAll():Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}`);
  }

}
