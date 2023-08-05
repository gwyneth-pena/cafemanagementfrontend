import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  add(data:any): Observable<any>{
    return this.http.post(`${this.url}/product/add`, data);
  }

  get(id?: number): Observable<any>{
    let url:any = id? `${this.url}/product/get/${id}` : `${this.url}/product/get`;
    return this.http.get(url);
  }

  getByCategory(id: number): Observable<any>{
    let url:any = `${this.url}/product/get/category/${id}`;
    return this.http.get(url);
  }

  update(data: any): Observable<any>{
    return this.http.patch(`${this.url}/product/update/${data.id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.url}/product/delete/${id}`);
  }

}
