import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../pages/article';
import { FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':'http://localhost:5000/Article'})
};
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly apiUrl='http://localhost:5000/Article';
  listarticle: Article[];
  article: Article= new Article();
  public formData: FormGroup;

  constructor(private http:HttpClient,private toastr: ToastrService) { }


  getData(Id: string): Observable<object> {
    return this.http.get(`${this.apiUrl}/${Id}`);
  }

  addArticle(info: object): Observable<object> {
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
