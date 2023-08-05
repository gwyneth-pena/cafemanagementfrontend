import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  add(data:any): Observable<any>{
    return this.http.post(`${this.url}/category/add`, data);
  }

  get(id?: number): Observable<any>{
    let url:any = id? `${this.url}/category/get/${id}` : `${this.url}/category/get`;
    return this.http.get(url);
  }

  update(data: any): Observable<any>{
    return this.http.patch(`${this.url}/category/update/${data.id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/category/delete/${id}`);
  }

}
